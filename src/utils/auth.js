const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.createAccessToken = user => {
    return jwt.sign({
        email: user.email,
        password: user.password
    }, process.env.ACCESS_TOKEN_SECRET)
}

exports.verifyToken = token => {
    new Promise((resolve, reject) => {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) return reject(err)
            resolve(payload)
        })
    })
}

exports.validatePassword = (password, hashedPassword) => {
    return new Promise((resolve,reject) => {
        bcrypt.compare(password,hashedPassword, (err,success) => {
            if (err) reject(err)
            resolve(success)
        })
    })
}