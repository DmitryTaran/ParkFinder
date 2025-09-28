import {makeAutoObservable} from "mobx";

export default class OneCameraStore {

    constructor() {

        this._camera = {}

        makeAutoObservable(this)
    }

    setCamera(camera){
        this._camera = camera
    }

    get address() {
        return this._camera.address
    }

    get isEnabled() {
        return this._camera.is_enabled
    }

    get source() {
        return this._camera.source
    }

    get markUp(){
        return this._camera.mark_up
    }

    get latitude() {
        return this._camera.latitude
    }

    get longitude() {
        return this._camera.longitude
    }

    get camera(){
        return  this._camera
    }

}