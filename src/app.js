const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const db = require('./database/db')

const app = express()
app.disable('x-powered-by')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))

const localConnection = () => {
    return new Promise((resolve, reject) => {
        db.localDB.authenticate().then(err => {
            if (err) reject(err)
            resolve('Connected to local db.')
        })
    })
}

const remoteConnection = () => {
    return new Promise((resolve, reject) => {
        db.remoteDB.authenticate().then(err => {
            if (err) reject(err)
            resolve('Connected to remote db.')
        })
    })
}
module.exports = {app, localConnection, remoteConnection}