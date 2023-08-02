const { Sequelize } = require('sequelize')

const db = new Sequelize('node2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

module.exports = { db }