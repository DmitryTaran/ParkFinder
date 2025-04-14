import {makeAutoObservable} from "mobx";

export default class MarkUpSettingsStore {

    constructor(props) {
        this._tool = {}
        makeAutoObservable(this)
    }

    setTool(tool) {
        this._tool = tool
    }

    get tool(){
        return this._tool
    }

}