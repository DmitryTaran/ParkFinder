const Router = require('express')
const cameraRouter = require('./cameraRouter')
const userRouter = require('./userRouter')
const router = new Router()

router.use('/camera', cameraRouter)
router.use('/user', userRouter)

module.exports = router