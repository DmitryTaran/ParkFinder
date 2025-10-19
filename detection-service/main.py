import json
import uuid

import numpy as np
import cv2 as cv
from yolo_config import confidence, iou
from detection import detect
from models.experimental import attempt_load
from utils.general import set_logging
from utils.torch_utils import select_device
from fastapi import FastAPI, UploadFile, File, Body, Request, Form
from myUtils import cvFrameToYoloImage, parseMarkUp, getCarBoxes, compute_overlaps, getFreeParkingLotsCount, \
    drawLotsOnImage
import asyncio

app = FastAPI()

model = None
device = None


async def process_image(image, parking_lots):
    img = cvFrameToYoloImage(image)
    detection_result = detect(image, img, model, device, confidence, iou)
    car_boxes = getCarBoxes(detection_result)
    overlaps = compute_overlaps(parking_lots, car_boxes)
    [checked_parking_lots, free_lots_count] = getFreeParkingLotsCount(parking_lots, overlaps)
    drawLotsOnImage(checked_parking_lots, image)
    cv.imwrite(f'detections/{uuid.uuid4()}.jpg', image)
    return free_lots_count


@app.on_event("startup")
def startup_event():
    global model, device
    weights = 'yolov7.pt'
    set_logging()
    device = select_device('')
    model = attempt_load(weights, map_location=device)


@app.post("/detect")
async def detect_image(mark_up: str = Form(...), frame: UploadFile = File(...)):
    contents = await frame.read()
    parking_lots = parseMarkUp(json.loads(mark_up))
    nparray = np.frombuffer(contents, np.uint8)
    image = cv.imdecode(nparray, cv.IMREAD_COLOR)
    result = await process_image(image, parking_lots)
    return result


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8002)

app.run(debug=True)
