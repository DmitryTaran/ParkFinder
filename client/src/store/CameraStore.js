import {makeAutoObservable} from "mobx";

export default class CameraStore {

    constructor() {
        this._cameras = []
        makeAutoObservable(this)
    }

    setCameras(cameras) {
        this._cameras = cameras
    }

    findCameraById(id) {
        return this._cameras.find(camera => parseInt(camera.id) === parseInt(id))
    }

    addCamera(camera) {
        this._cameras.push(camera)
    }

    deleteCamera(id) {
        this._cameras = this._cameras.filter(camera => camera.id !== id)
    }

    updateCamera(newCamera) {
        const index = this._cameras.findIndex(camera => camera.id === parseInt(newCamera.id))
        this._cameras[index] = newCamera
    }

    get cameras() {
        return this._cameras
    }
}