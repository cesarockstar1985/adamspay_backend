const { Sequelize } = require('sequelize')

const db = new Sequelize(
    process.env.MYSQLDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,{
        host: process.env.MYSQLHOST,
        port: process.env.MYSQLPORT,
})

module.exports = { db }