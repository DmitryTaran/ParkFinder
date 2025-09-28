import React, {useContext, useState} from 'react';
import cl from './cameraInfo.module.css'
import {observer} from "mobx-react-lite";
import Modal from "../UI/Modal/Modal.jsx";
import UpdateCameraForm from "../UpdateCameraForm/UpdateCameraForm.jsx";
import {useNavigate} from "react-router-dom";
import {MARKUP_ROUTE} from "../../utils/consts.js";
import {useFetching} from "../../hooks/useFetching.js";
import Loading from "../UI/Loading/Loading.jsx";
import axios from "axios";
import {Context} from "../../App.jsx";
import {disableCamera, enableCamera} from "../../http/cameraAPI.js";
import {notifyCapture} from "../../http/captureAPI.js";

const CameraInfo = observer(({camera}) => {

    const navigate = useNavigate()

    const [updateCameraActive, setUpdateCameraActive] = useState(false)

    const {cameraStore} = useContext(Context)

    const [disable, isDisableLoading] = useFetching(async () => {
        await disableCamera(camera.id)
            .then(() => cameraStore.updateCamera({...camera, is_enabled: false}))
            .then(() => notifyCapture()).catch((reason) => console.log(reason))

    })

    const [enable, isEnableLoading] = useFetching(async () => {
        await enableCamera(camera.id)
            .then(() => cameraStore.updateCamera({...camera, is_enabled: true}))
            .then(() => notifyCapture()).catch((reason) => console.log(reason))
    })

    return (
        <div className={cl.cameraInfo}>
            <Loading isLoading={isDisableLoading || isEnableLoading}/>
            <h2>Подробная информация</h2>
            <div className={cl.cameraInfoItem}>
                <span> Источник: </span> {camera.source}
            </div>
            <div className={cl.cameraInfoItem}>
                <span> Адрес: </span> {camera.address}
            </div>
            <div className={cl.cameraInfoItem}>
                <span> Широта:</span> {camera.latitude}
            </div>
            <div className={cl.cameraInfoItem}>
                <span> Долгота:</span> {camera.longitude}
            </div>
            <div className={cl.cameraInfoItem}>
                <span> Состояние:</span> {camera.is_enabled ? 'Работает' : 'Отключена'}
            </div>
            <div className={cl.cameraInfoItem}>
                <span> Количество парковочных мест: </span>
                {camera.mark_up ? JSON.parse(camera.mark_up).length : "Внимание!!! Разметка не добавлена"}
            </div>
            <div className={cl.cameraInfoItem}>
                <span> Частота съемки: </span>
                {camera.update_frequency} c
            </div>
            <div className={cl.cameraInfoItem}>
                <span> Масштабирование: </span>
                {camera.scaling_coef}
            </div>
            <button onClick={() => setUpdateCameraActive(true)}>Редактировать</button>
            <button onClick={() => navigate('/' + MARKUP_ROUTE + camera.id)}>Добавить разметку</button>
            {
                camera.is_enabled
                    ? <button onClick={disable}>Отключить</button>
                    : <button onClick={enable}>Включить</button>

            }
            <Modal active={updateCameraActive} setActive={setUpdateCameraActive}>
                <UpdateCameraForm camera={camera} setActive={setUpdateCameraActive}/>
            </Modal>
        </div>
    );
});

export default CameraInfo;

//Направление куда смотрит камера
//Разметка на карте
//Хранить в бд количество парковочных мест
//Частота съемки
// в зависимости от места менять частоту съемки
// разметка изображений