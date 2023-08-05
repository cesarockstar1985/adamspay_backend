const { Sequelize } = require('sequelize')

const db = new Sequelize(process.env.MYSQLDATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD, {
    host: process.env.MYSQLHOST,
    dialect: 'mysql',
    // logging: false
})

module.exports = { db }