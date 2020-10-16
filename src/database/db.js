const Sequelize = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()

const localDB = new Sequelize(
    process.env.LOCAL_DB_NAME,
    process.env.LOCAL_DB_USERNAME,
    process.env.LOCAL_DB_PASSWORD, {
        host: process.env.LOCAL_DB_HOST,
        dialect: 'mysql',
    }
)

const remoteDB = new Sequelize(
    process.env.REMOTE_DB_NAME,
    process.env.REMOTE_DB_USERNAME,
    process.env.REMOTE_DB_PASSWORD, {
        host: process.env.REMOTE_DB_HOST,
        dialect: 'mysql',
    }
)

module.exports = {localDB, remoteDB}