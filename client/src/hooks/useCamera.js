import {useParams} from "react-router-dom";
import {useContext} from "react";
import {Context} from "../App.jsx";


export const useCamera = () => {
    const {id} = useParams()
    const {cameraStore} = useContext(Context)
    return [cameraStore.findCameraById(id), cameraStore]
}