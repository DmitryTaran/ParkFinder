import React, {useContext, useState} from 'react';
import cl from './cameraItem.module.css'
import {BsPencil, RxCross2} from "react-icons/all.js";
import {Context} from "../../App.jsx";
import Modal from "../UI/Modal/Modal.jsx";
import Confirmation from "../Confirmation/Confirmation.jsx";
import {useFetching} from "../../hooks/useFetching.js";
import {destroyCamera} from "../../http/cameraAPI.js";
import Loading from "../UI/Loading/Loading.jsx";
import {notifyCapture} from "../../http/captureAPI.js";

const CameraItem = ({camera, ...props}) => {

    const {cameraStore} = useContext(Context)

    const [confirmDeleteModalActive, setConfirmDeleteModalActive] = useState(false)

    const [deleteCamera, isDeleteCameraLoading] = useFetching(async () => {
        await destroyCamera(camera.id).then(() => {
            cameraStore.deleteCamera(camera.id)
        }).then(() => notifyCapture()).catch((reason) => console.log(reason))
    })

    const [isShowDeleteButton, setIsShowDeleteButton] = useState(false)

    return (
        <>
            <Loading isLoading={isDeleteCameraLoading}/>
            <div className={cl.cameraItem}
                 style={{backgroundImage: `url(${camera.source})`}}
                 onMouseEnter={() => setIsShowDeleteButton(true)}
                 onMouseLeave={() => setIsShowDeleteButton(false)}
                 {...props}
            >
                {
                    isShowDeleteButton &&
                    <div className={cl.buttonsPanel}>
                        <button
                            className={cl.deleteButton}
                            onClick={(e) => {
                                e.stopPropagation()
                                setConfirmDeleteModalActive(true)
                            }}
                        >
                            <RxCross2/>
                        </button>
                    </div>

                }
                <div className={cl.title}>
                    {camera.address}
                </div>
            </div>

            <Modal setActive={setConfirmDeleteModalActive} active={confirmDeleteModalActive}>
                <Confirmation
                    text={'Вы уверены, что хотите удалить камеру?'}
                    positiveAction={deleteCamera}
                    negativeAction={() => setConfirmDeleteModalActive(false)}
                />
            </Modal>
        </>

    );
};

export default CameraItem;