const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const CameraModel = sequelize.define('camera', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    source: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
    latitude: {type: DataTypes.FLOAT, allowNull: false},
    longitude: {type: DataTypes.FLOAT, allowNull: false},
    mark_up: {type: DataTypes.TEXT},
    is_enabled: {type: DataTypes.BOOLEAN, defaultValue: true},
    update_frequency: {type: DataTypes.INTEGER, defaultValue: 30},
    scaling_coef: {type: DataTypes.FLOAT, defaultValue: 1}
})

module.exports = CameraModel