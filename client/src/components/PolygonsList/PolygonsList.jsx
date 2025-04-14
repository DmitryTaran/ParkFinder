import React from 'react';
import {useCamera} from "../../hooks/useCamera.js";
import PolygonItem from "../PolygonItem/PolygonItem.jsx";
import {observer} from "mobx-react-lite";
import cl from './polygonsList.module.css'

const PolygonsList = observer(() => {

    const [currentCamera, cameraStore] = useCamera()
    const polygons = JSON.parse(currentCamera.mark_up)
    return (
        <>
            <div className={cl.polygonList}>
                <h2 className={cl.title}>Парковочные места</h2>
                <div className={cl.items}>
                    {polygons?.map(polygon => <PolygonItem key={polygon.id} lot={polygon}/>)}
                </div>
            </div>
        </>

    );
});

export default PolygonsList;
