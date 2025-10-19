import asyncio
import json
import cv2
import aiohttp
from consts import CAMERA_SERVICE_URL, YOLO_URL, DATA_COLLECTOR_URL
from fastapi.middleware.cors import CORSMiddleware
from utils import getCaptureWidthAndHeight, denormalizeCoords
from fastapi import FastAPI

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

is_capture_running = False

tasks = []


async def capture_task(camera):
    while is_capture_running:
        if not is_capture_running:
            break
        success, frame, width, height = await capture_frame(camera['source'])
        if success:
            denormalized_mark_up = denormalizeCoords(json.loads(camera['mark_up']), width, height)
            print(f"Кадр с камеры {camera['id']} получен. Отправка на сервер распознавания")
            result = await process_frame(frame, denormalized_mark_up)
            print('Пришел ответ:', result)
            await send_to_database(camera, result, len(denormalized_mark_up))
            print("Отправлен запрос на добавление в базу")
        await asyncio.sleep(camera['update_frequency'])


async def capture_frame(source):
    try:
        capture = cv2.VideoCapture(source)
        success, frame = capture.read()
        width, height = getCaptureWidthAndHeight(capture)
        capture.release()
        return success, frame, width, height
    except cv2.error as e:
        return


async def process_frame(frame, mark_up):
    _, encoded_frame = cv2.imencode('.jpg', frame)
    data = encoded_frame.tobytes()

    async with aiohttp.ClientSession() as session:
        form = aiohttp.FormData()
        form.add_field('frame', data, content_type='image/jpeg')
        form.add_field('mark_up', json.dumps(mark_up))
        async with session.post(YOLO_URL + '/detect', data=form) as response:
            result = await response.json()
            return result


async def get_cameras_data():
    async with aiohttp.ClientSession() as session:
        async with session.get(CAMERA_SERVICE_URL + '/api/camera/enabled_cameras') as response:
            return await response.json()


async def send_to_database(camera, result, parking_lots):
    async with aiohttp.ClientSession() as session:
        data = {
            'camera_id': camera['id'],
            'address': camera['address'],
            'latitude': camera['latitude'],
            'longitude': camera['longitude'],
            'free_lots': result,
            'parking_lots': parking_lots
        }
        async with session.post(DATA_COLLECTOR_URL + '/api', json=data) as response:
            return await response.json()


def cancel_tasks():
    global tasks
    for task in tasks:
        task.cancel()
    tasks = []


@app.get("/")
async def check():
    global is_capture_running
    if is_capture_running:
        return {"message": "Сервис видеозахвата работает в данный момент"}
    else:
        return {"message": "Сервис видеозахвата не работает в данный момент"}


@app.post("/start_capture")
async def start_capture():
    global tasks, is_capture_running
    if not is_capture_running:
        is_capture_running = True
        cameras = await get_cameras_data()




        for camera in cameras:
            tasks.append(asyncio.create_task(capture_task(camera)))
        # await asyncio.gather(*tasks)
        return {"message": "Видеозахват начался"}
    else:
        return {"message": "Видеозахват уже работает"}


@app.post("/stop_capture")
async def stop_capture():
    global is_capture_running, tasks
    is_capture_running = False
    await asyncio.gather(*tasks)
    cancel_tasks()
    return {"message": "Захват кадров остановлен"}


@app.post('/hook')
async def restart_capture():
    global tasks, is_capture_running
    is_capture_running = False
    cancel_tasks()
    await asyncio.gather(*tasks)
    is_capture_running = True
    cameras = await get_cameras_data()
    for camera in cameras:
        tasks.append(asyncio.create_task(capture_task(camera)))
    return {"message": "Рестарт захвата кадров"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001)
