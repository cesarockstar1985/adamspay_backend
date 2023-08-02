const { DataTypes, Sequelize } = require('sequelize')
const { db } = require('../db/connection')

const Sala = db.define('sala', {
    nombre: {
        type: DataTypes.STRING
    },
    active: {
        type: DataTypes.BOOLEAN
    }
})

module.exports = { Sala }