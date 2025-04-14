import React from 'react';
import {observer} from "mobx-react-lite";
import CameraInfo from "../components/CameraInfo/CameraInfo.jsx";
import {useCamera} from "../hooks/useCamera.js";

const CameraInfoPage = observer(() => {

    const [currentCamera, _] = useCamera()

    return (
        <div>
            <div className='title-wrapper'>
                <h1>{currentCamera.address}</h1>
                <div className='stream'>
                    <img  src={currentCamera.source} alt={"Загрузка..."}/>
                </div>
                <CameraInfo camera={currentCamera}/>
            </div>
        </div>

    );
});

export default CameraInfoPage;