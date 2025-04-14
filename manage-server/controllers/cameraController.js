const ApiError = require('../error/ApiError')
const CameraModel = require('../models/cameraModel')
const path = require('path')
const uuid = require('uuid')
const axios = require('axios')
const {Op} = require("sequelize");

class CameraController {

    async getOneCamera(req, res, next) {

        try {

            const {id} = req.params

            const camera = await CameraModel.findOne({where: {id}})

            return res.json(camera)

        } catch (e) {

            return next(ApiError.badRequest(e.message))

        }

    }

    async getAllCameras(req, res) {

        const cameras = await CameraModel.findAll()

        return res.json(cameras)
    }

    async getEnabledCameras(req, res, next) {
        try {

            const cameras = await CameraModel.findAll(
                {
                    where: {
                        is_enabled: true
                    }
                }
            )

            return res.json(cameras)

        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async addCamera(req, res, next) {

        try {
            const {...newCamera} = req.body

            const camera = await CameraModel.create({...newCamera})

            return res.json(camera)

        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }


    }

    async updateCamera(req, res, next) {
        try {
            const {id, ...updated} = req.body
            console.log(updated)
            await CameraModel.update({...updated}, {where: {id}})
            const camera = await CameraModel.findByPk(id)
            return res.json(camera)
        } catch (e) {
            console.log(e.message)
            return next(ApiError.badRequest(e.message))
        }

    }


    async disableCamera(req, res, next) {

        try {

            const {id} = req.body
            await CameraModel.update({is_enabled: false}, {where: {id}})

            return res.json({message: 'Камера отключена'})

        } catch (e) {

            return next(ApiError.badRequest(e.message))

        }

    }

    async enableCamera(req, res, next) {

        try {

            const {id} = req.body
            console.log(id)
            await CameraModel.update({is_enabled: true}, {where: {id}})

            return res.json({message: 'Камера включена'})

        } catch (e) {

            return next(ApiError.badRequest(e.message))

        }

    }

    async deleteCamera(req, res, next) {
        try {

            const {id} = req.params

            const camera = await CameraModel.destroy({where: {id}})

            return res.json(camera)

        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new CameraController()