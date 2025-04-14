import React, {useContext, useState} from 'react';
import CameraItem from "../CameraItem/CameraItem.jsx";
import cl from './camerasList.module.css'
import {BsPlusLg} from "react-icons/all.js";
import {useNavigate} from "react-router-dom";
import {CAMERA_ROUTE} from "../../utils/consts.js";
import {Context} from "../../App.jsx";
import {observer} from "mobx-react-lite";
import Modal from "../UI/Modal/Modal.jsx";
import CreateCameraForm from "../CreateCameraForm/CreateCameraForm.jsx";

const CamerasList = observer(() => {

    const navigate = useNavigate()

    const {cameraStore} = useContext(Context)

    const [createCameraActive, setCreateCameraActive] = useState(false)

    return (
        <>
            <div className={cl.boardList}>
                {cameraStore.cameras.map(camera =>
                    <CameraItem key={camera.id} camera={camera} onClick={() => navigate(CAMERA_ROUTE + camera.id)}/>
                )}
                <div className={cl.addBoard} onClick={() => setCreateCameraActive(true)}>
                    <BsPlusLg size={70} color={'#6b6b6b'}/>
                </div>
            </div>
            <Modal active={createCameraActive} setActive={setCreateCameraActive}>
                <CreateCameraForm setActive={setCreateCameraActive}/>
            </Modal>
        </>

    );
});

export default CamerasList;