import React, {useContext, useState} from 'react';
import cl from './polygonItem.module.css'
import {RxCross1} from "react-icons/all.js";
import {Context} from "../../App.jsx";
import {useCamera} from "../../hooks/useCamera.js";
import Modal from "../UI/Modal/Modal.jsx";
import Confirmation from "../Confirmation/Confirmation.jsx";
import {useFetching} from "../../hooks/useFetching.js";
import {updateCamera} from "../../http/cameraAPI.js";
import Loading from "../UI/Loading/Loading.jsx";
import {denormalizeXY, polygonCenter} from "../../utils/math.js";
import {notifyCapture} from "../../http/captureAPI.js";

const PolygonItem = ({lot}) => {

    const [showDelete, setShowDelete] = useState(false)

    const [confirmDeleteLotModalActive, setConfirmDeleteLotModalActive] = useState(false)

    const [currentCamera, cameraStore] = useCamera()

    const {settingsStore, canvasStore} = useContext(Context)

    const [deleteLot, isDeleteLotLoading] = useFetching(async () => {
        const currentMarkUp = JSON.parse(currentCamera.mark_up)
        const updatedCamera = {
            ...currentCamera,
            mark_up: JSON.stringify(currentMarkUp.filter(poly => poly.id !== lot.id)),
        }
        await updateCamera(currentCamera.id, updatedCamera).then(data => {
            cameraStore.updateCamera(data)
        }).then(() => notifyCapture()).catch((reason) => console.log(reason))
        setConfirmDeleteLotModalActive(false)
    })

    const selectPolygon = () => {
        const context = settingsStore.tool.context
        context.clearRect(0, 0, canvasStore.canvas.width, canvasStore.canvas.height);
        denormalizeXY(JSON.parse(currentCamera.mark_up), canvasStore.canvas).forEach(polygon => {
            context.beginPath()
            context.moveTo(polygon.points[0].x, polygon.points[0].y)
            polygon.points.forEach(point => {
                context.lineTo(point.x, point.y)
            })
            context.strokeStyle = 'black'
            if (polygon.id === lot.id) {
                context.strokeStyle = 'green'
            }
            context.closePath()
            context.stroke()
            context.font = "bold 8px Arial";
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            const [x, y] = polygonCenter(polygon.points)
            context.fillText(polygon.id, x, y);
        })
    }

    return (
        <>
            <Loading isLoading={isDeleteLotLoading}/>
            <div
                className={cl.polygonItem}
                onMouseEnter={() => setShowDelete(true)}
                onMouseLeave={() => setShowDelete(false)}
                onClick={selectPolygon}
            >
                <div>
                    {lot.id}
                </div>
                {
                    showDelete &&
                    <div className={cl.button} onClick={() => setConfirmDeleteLotModalActive(true)}>
                        <RxCross1 size={10}/>
                    </div>
                }
            </div>
            <Modal setActive={setConfirmDeleteLotModalActive} active={confirmDeleteLotModalActive}>
                <Confirmation
                    text={'Вы уверены, что хотите удалить парковочное место?'}
                    positiveAction={deleteLot}
                    negativeAction={() => setConfirmDeleteLotModalActive(false)}
                />
            </Modal>
        </>

    );
};

export default PolygonItem;