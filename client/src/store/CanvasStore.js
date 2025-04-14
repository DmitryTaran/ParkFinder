import {makeAutoObservable} from "mobx";

export default class CanvasStore{
    constructor() {
        this._canvas = null
        makeAutoObservable(this)
    }

    setCanvas(canvasRef){
        this._canvas = canvasRef
    }

    get canvas(){
        return this._canvas
    }
}