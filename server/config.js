const { db } = require('../server/db/connection')

const dbConnection = async () => {
    try {
        await db.authenticate()
        console.log('Database online');
    } catch (error) {
        throw new Error('Db connection failed')
    }
} 

module.exports = {
    dbConnection
}