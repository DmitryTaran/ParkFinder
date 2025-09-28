const ApiError = require('../error/ApiError')
const DetectionModel = require('../models/detectionModel')
const {Op} = require("sequelize");

class DetectionController {

    async createDetection(req, res, next) {
        try {

            const {...data} = req.body

            const detection = await DetectionModel.create(data)

            return res.json(detection)

        } catch (e) {
            return res.json(next(ApiError.badRequest(e.message)))
        }
    }

    async getAllDetections(req, res, next) {
        try {

            const detections = await DetectionModel.findAll()

            return res.json(detections)

        } catch (e) {
            return res.next(ApiError.badRequest(e.message))
        }
    }

    async getLastDetection(req, res, next) {
        try {

            const {camera_id} = req.query
            const detections = await DetectionModel.findOne({
                where: {
                    camera_id
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })

            return res.json(detections)

        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new DetectionController()