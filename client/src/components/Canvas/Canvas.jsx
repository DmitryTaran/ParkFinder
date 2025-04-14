import React, {useContext, useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../App.jsx";
import cl from './canvas.module.css'
import Polygon from "../../tools/Polygon.js";
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching.js";
import {updateCamera} from "../../http/cameraAPI.js";
import Loading from "../UI/Loading/Loading.jsx";
import {denormalizeXY, normalizeXY, polygonCenter} from "../../utils/math.js";
import {notifyCapture} from "../../http/captureAPI.js";

const Canvas = observer(() => {

    const {id} = useParams()
    const {cameraStore, canvasStore, settingsStore} = useContext(Context)
    const currentCamera = cameraStore.findCameraById(id)
    const canvasRef = useRef(null)
    const img = new Image()
    const [polygons, setPolygons] = useState([])

    const drawMarkUp = (markUp, context) => {
        setPolygons(markUp ? markUp : [])
        context.strokeStyle = 'black'
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        markUp?.forEach(polygon => {
            context.beginPath()
            context.moveTo(polygon.points[0].x, polygon.points[0].y)
            polygon.points.forEach(point => {
                context.lineTo(point.x, point.y)
            })
            context.closePath()
            context.stroke()
            context.font = "bold 8px Arial";
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            const [x, y] = polygonCenter(polygon.points)
            context.fillText(polygon.id, x, y);
        })
    }

    useEffect(() => {
        canvasStore.setCanvas(canvasRef.current)
        settingsStore.setTool(new Polygon(canvasRef.current, polygons, setPolygons))
        canvasRef.current.style.backgroundImage = `url(${currentCamera.source})`
        img.src = currentCamera.source
        img.onload = () => {
            canvasRef.current.setAttribute('width', img.width * currentCamera.scaling_coef)
            canvasRef.current.setAttribute('height', img.height * currentCamera.scaling_coef)
            const denormalizedPolygons = denormalizeXY(JSON.parse(currentCamera.mark_up), canvasRef.current)
            drawMarkUp(denormalizedPolygons, settingsStore.tool.context)
        }
        return () => {
            settingsStore.tool.destroyEvents()
        }
    }, [])

    useEffect(() => {
        const denormalizedPolygons = denormalizeXY(JSON.parse(currentCamera.mark_up), canvasRef.current)
        drawMarkUp(denormalizedPolygons, settingsStore.tool.context)
    }, [currentCamera])

    const [setMarkUp, isSetMarkUpLoading] = useFetching(async () => {

        const normalizedPolygons = normalizeXY(polygons, canvasRef.current)
        await updateCamera(id, {...currentCamera, mark_up: JSON.stringify(normalizedPolygons)})
            .then(data => {
                cameraStore.updateCamera(data)
            }).then(() => notifyCapture()).catch((reason) => console.log(reason))
    })
    const randomClickCancel = (e) => {
        if (e.shiftKey) {
            settingsStore.tool.destroyPolygon()
            const denormalizedPolygons = denormalizeXY(JSON.parse(currentCamera.mark_up), canvasRef.current)
            drawMarkUp(denormalizedPolygons, settingsStore.tool.context)
        }
        if (e.ctrlKey) {
            if (settingsStore.tool.pointsCount > 1) {
                settingsStore.tool.endPolygon()
                setPolygons([...polygons, {id: Date.now(), points: settingsStore.tool.polygon}])
                settingsStore.tool.destroyPolygon()
            }
            return
        }
    }
    return (
        <>
            <Loading isLoading={isSetMarkUpLoading}/>
            <div className={cl.canvas}>
                <canvas ref={canvasRef} onClick={randomClickCancel}/>
                <div className={cl.buttons}>
                    {/*<button onClick={cleanUp}>Очистить</button>*/}
                    <button onClick={setMarkUp}>Сохранить</button>
                </div>
            </div>
        </>
    );
});

export default Canvas;