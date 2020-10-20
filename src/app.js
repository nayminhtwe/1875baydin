const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const db = require('./database/db')
const {authCheckMiddleware} = require('./utils/auth')

//Routes
const userRouter = require('./app/routers/userRouter')
const categoryRouter = require('./app/routers/categoryRouter')
const subscriptionRouter = require('./app/routers/subscriptionRouter')

const app = express()
app.disable('x-powered-by')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))

//routers use
app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/subscription/', authCheckMiddleware, subscriptionRouter)

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

app.use((req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status).json({
        error: {
            message: error.message
        }
    });
})
module.exports = {app, localConnection, remoteConnection}