const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const DetectionModel = sequelize.define('detection', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    camera_id: {type: DataTypes.INTEGER, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
    latitude: {type: DataTypes.FLOAT, allowNull: false},
    longitude: {type: DataTypes.FLOAT, allowNull: false},
    parking_lots: {type: DataTypes.INTEGER, allowNull: false},
    free_lots: {type: DataTypes.INTEGER}
})

module.exports = DetectionModel