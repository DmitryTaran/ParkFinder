import React, {useContext, useState} from 'react';
import Form from "../UI/Form/Form.jsx";
import Input from "../UI/Input/Input.jsx";
import cl from './createCameraForm.module.css'
import {Context} from "../../App.jsx";
import {useFetching} from "../../hooks/useFetching.js";
import {createCamera} from "../../http/cameraAPI.js";
import Loading from "../UI/Loading/Loading.jsx";
import {notifyCapture} from "../../http/captureAPI.js";

const CreateCameraForm = ({setActive}) => {

    const {cameraStore} = useContext(Context)

    const [source, setSource] = useState('')
    const [address, setAddress] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [addCamera, isAddCameraLoading] = useFetching(async () => {
        await createCamera({source, address, latitude, longitude}).then(data => {
            cameraStore.addCamera(data)
            setActive(false)
        }).then(() => notifyCapture()).catch((reason) => console.log(reason))
    })

    return (
        <Form>
            <Loading isLoading={isAddCameraLoading}/>
            <h2 className={cl.title}>Добавить камеру</h2>
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
            <div className={cl.buttons}>
                <button className={cl.button} onClick={() => setActive(false)}>Отмена</button>
                <button className={cl.button} onClick={addCamera}>Добавить</button>
            </div>
        </Form>
    );
};

export default CreateCameraForm;