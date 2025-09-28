import React, {useContext, useState} from 'react';
import Form from "../UI/Form/Form.jsx";
import Input from "../UI/Input/Input.jsx";
import cl from './updateCameraForm.module.css'
import {Context} from "../../App.jsx";
import {useFetching} from "../../hooks/useFetching.js";
import {updateCamera} from "../../http/cameraAPI.js";
import Loading from "../UI/Loading/Loading.jsx";
import {useParams} from "react-router-dom";
import {notifyCapture} from "../../http/captureAPI.js";

const UpdateCameraForm = ({setActive, camera}) => {

    const {id} = useParams()

    const {cameraStore} = useContext(Context)

    const [source, setSource] = useState(camera.source)
    const [address, setAddress] = useState(camera.address)
    const [latitude, setLatitude] = useState(camera.latitude)
    const [longitude, setLongitude] = useState(camera.longitude)
    const [frequency, setFrequency] = useState(camera.update_frequency)
    const [scale, setScale] = useState(camera.scaling_coef)

    const [editCamera, isEditCameraLoading] = useFetching(async () => {
        await updateCamera(id, {
            source,
            address,
            latitude,
            longitude,
            update_frequency: frequency,
            scaling_coef: scale
        }).then(data => {
            cameraStore.updateCamera(data)
            setActive(false)
        }).then(() => notifyCapture()).catch((reason) => console.log(reason))
    })


    return (
        <Form>
            <Loading isLoading={isEditCameraLoading}/>
            <h2 className={cl.title}>Редактировать камеру</h2>
            <Input
                type="text" placeholder="Введите URL камеры"
                onChange={(e) => setSource(e.target.value)}
                value={source}
                label={'URL'}
            />
            <Input
                type="text" placeholder="Введите адрес"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                label={'Адрес'}
            />
            <Input
                type="text" placeholder="Введите широту"
                onChange={(e) => setLatitude(e.target.value)}
                value={latitude}
                label={'Широта'}
            />
            <Input
                type="text" placeholder="Введите долготу"
                onChange={(e) => setLongitude(e.target.value)}
                value={longitude}
                label={'Долгота'}
            />
            <Input
                type="text" placeholder="Введите частоту"
                onChange={(e) => setFrequency(e.target.value)}
                value={frequency}
                label={'Частота съемки'}
            />
            <Input
                type="text" placeholder="Введите коэффициент"
                onChange={(e) => setScale(e.target.value)}
                value={scale}
                label={'Масштабирование'}
            />
            <div className={cl.buttons}>
                <button className={cl.button} onClick={() => setActive(false)}>Отмена</button>
                <button className={cl.button} onClick={editCamera}>Изменить</button>
            </div>
        </Form>
    );
};

export default UpdateCameraForm;