require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/detectionRouter')
const sequelize = require('./db')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()
