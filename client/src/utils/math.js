export const polygonCenter = (polygon) => {
    const point = polygon.reduce((accum, point) => {
            return {
                x: accum.x + point.x,
                y: accum.y + point.y
            }
        },
    )
    return [point.x / polygon.length, point.y / polygon.length]
}

export const normalizeXY = (polygons, canvas) => {
    return polygons.map(polygon => {
        return {
            ...polygon,
            points: polygon.points.map(point => {
                return {x: point.x / canvas.width, y: point.y / canvas.height}
            })
        }
    })
}

export const denormalizeXY = (polygons, canvas) => {
    return polygons?.map(polygon => {
        return {
            ...polygon,
            points: polygon.points.map(point => {
                return {x: point.x * canvas.width, y: point.y * canvas.height}
            })
        }
    })
}
