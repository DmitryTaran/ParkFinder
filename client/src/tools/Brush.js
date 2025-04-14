export default class Brush {
    constructor(canvas) {
        this._canvas = canvas
        this._ctx = canvas.getContext('2d')
        this.listen()
    }

    destroyEvents(){
        this._canvas.onmousemove = null
        this._canvas.onmousedown = null
        this._canvas.onmouseup = null
    }

    listen() {
        this._canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this._canvas.onmousedown = this.mouseDownHandler.bind(this)
        this._canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseMoveHandler(e) {
        if (!this._mouseDown){
            return
        }
        this.draw(e)
    }

    mouseDownHandler(e) {
        this._mouseDown = true
        this._ctx.beginPath()
        this._ctx.moveTo(e.offsetX, e.offsetY)
    }

    mouseUpHandler(e) {
        this._mouseDown = false
    }

    draw({offsetX, offsetY}){
        this._ctx.lineTo(offsetX, offsetY)
        this._ctx.stroke()
    }

}