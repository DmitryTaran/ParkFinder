import React, {useContext, useEffect, useState} from 'react';
import CamerasList from "../components/CamerasList/CamerasList.jsx";
import {useFetching} from "../hooks/useFetching.js";
import {getCameras} from "../http/cameraAPI.js";
import {Context} from "../App.jsx";
import Loading from "../components/UI/Loading/Loading.jsx";
import {activateCapture, checkVideoCapture, deactivateCapture} from "../http/captureAPI.js";

const CameraPage = () => {

    const {cameraStore} = useContext(Context)
    const [working, setWorking] = useState('')
    const [fetchCameras, isFetchCamerasLoading] = useFetching(async () => {
        await getCameras().then(data => {
            cameraStore.setCameras(data)
        })
    })

    const [stopCapture, isStopCaptureLoading] = useFetching(async () => {
        await deactivateCapture().then(data => {
            setWorking(data)
        })
    })
    const [startCapture, isStartCaptureLoading] = useFetching(async () => {
        await activateCapture().then(data => {
            setWorking(data)
        })
    })

    const [checkCapture, isCheckCaptureLoading] = useFetching(async () => {
        await checkVideoCapture().then(data => {
            setWorking(data)
        })

    })

    useEffect(() => {
        fetchCameras()
        checkCapture()
    }, [])

    return (
        <div>
            <Loading isLoading={isFetchCamerasLoading || isCheckCaptureLoading}/>
            <div className='title-wrapper'>
                <h1>Доступные камеры</h1>
            </div>
            <CamerasList/>
            <div className='title-wrapper'>
                <h1>Сервис видеозахвата</h1>
            </div>
            <div className='video-capture'>
                <div>
                    {working ? working.message : 'Загрузка...'}
                </div>
                <button onClick={startCapture}>Начать обнаружение</button>
                <button onClick={stopCapture}>Остановить обнаружение</button>
            </div>

        </div>
    );
};

export default CameraPage;