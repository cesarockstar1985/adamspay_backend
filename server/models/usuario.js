const { DataTypes, Sequelize } = require('sequelize')
const { db } = require('../db/connection')

const Usuario = db.define('user', {
    nombre: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    }
})

module.exports = { Usuario }