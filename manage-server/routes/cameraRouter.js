const Router = require('express')

const router = new Router()

const CameraController = require('../controllers/cameraController')

router.get('/', CameraController.getAllCameras)
router.get('/getOne/:id', CameraController.getOneCamera)
router.get('/enabled_cameras', CameraController.getEnabledCameras)
router.post('/', CameraController.addCamera)
router.put('/', CameraController.updateCamera)
router.delete('/:id', CameraController.deleteCamera)
router.put('/enable', CameraController.enableCamera)
router.put('/disable', CameraController.disableCamera)

module.exports = router