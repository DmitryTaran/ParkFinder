import {$authHost} from "./index.js";
import {notifyCapture} from "./captureAPI.js";

export const getCameras = async () => {
    const {data} = await $authHost.get('api/camera')
    return data
}

export const getOneCamera = async (id) => {
    const {data} = await $authHost.get(`api/camera/${id}`)
    return data
}

export const createCamera = async (camera) => {
    const {data} = await $authHost.post('api/camera', camera)
    return data
}

export const updateCamera = async (id, camera) => {
    const {data} = await $authHost.put('api/camera', {id, ...camera})
    return data
}

export const destroyCamera = async (id) => {
    const {data} = await $authHost.delete(`api/camera/${id}`)
    return data
}

export const disableCamera = async (id) => {
    const {data} = await $authHost.put('api/camera/disable', {id})
    return data
}

export const enableCamera = async (id) => {
    const {data} = await $authHost.put('api/camera/enable', {id})
    return data
}