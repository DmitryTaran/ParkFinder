const Router = require('express')
const router = new Router()
const DetectionController = require('../controllers/detectionController')


router.get('/', DetectionController.getAllDetections)
router.get('/last', DetectionController.getLastDetection)
router.post('/', DetectionController.createDetection)

module.exports = router