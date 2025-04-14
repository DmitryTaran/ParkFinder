import canvas from "../components/Canvas/Canvas.jsx";

export default class Polygon {
    constructor(canvas) {
        this._canvas = canvas
        this._ctx = canvas.getContext('2d')
        this._polygon = []
        this._pointsCount = 0
        this.listen()
    }

    listen() {
        this._canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this._canvas.onmousedown = this.mouseDownHandler.bind(this)
    }

    mouseDownHandler(e) {
        this._isDrawing = true
        this._ctx.strokeStyle = 'black'
        this._polygon.push({
            x: e.offsetX,
            y: e.offsetY
        })
        // if (e.ctrlKey) {
        //     if (this.pointsCount > 2){
        //         this.endPolygon()
        //     }
        //     return
        // }
        this._pointsCount = this._polygon.length
        this._saved = this._canvas.toDataURL()
    }

    mouseMoveHandler(e) {
        if (!this._isDrawing) {
            return
        }
        this.draw(e.offsetX, e.offsetY)
    }

    draw(targetX, targetY) {
        const image = new Image()
        image.src = this._saved
        image.onload = () => {
            this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
            this._ctx.drawImage(image, 0, 0, this._canvas.width, this._canvas.height)
            this._ctx.beginPath()
            const {x, y} = this._polygon[this._pointsCount - 1]
            this._ctx.moveTo(x, y)
            this._ctx.lineTo(targetX, targetY)
            this._ctx.stroke()
        }
    }

    endPolygon() {
        const {x, y} = this._polygon[0]
        this._ctx.lineTo(x, y)
        this._ctx.stroke()
        this._isDrawing = false
    }

    destroyPolygon() {
        this._polygon = []
        this._pointsCount = 0
        this._isDrawing = false
    }

    destroyEvents() {
        this._canvas.onmousemove = null
        this._canvas.onmousedown = null
    }


    get polygon() {
        return this._polygon
    }

    get pointsCount() {
        return this._pointsCount
    }

    get context() {
        return this._ctx
    }

    get canvas() {
        return this._canvas
    }

}