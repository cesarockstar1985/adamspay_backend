const { DataTypes, Sequelize } = require('sequelize')
const { db } = require('../db/connection')

const Pedido = db.define('pedido', {
    docId: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER
    },
    productoId: {
        type: DataTypes.INTEGER
    },
    estado: {
        type: DataTypes.STRING
    }
})

module.exports = { Pedido }