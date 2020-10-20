const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../app/local-models').User
require('dotenv').config()

exports.createAccessToken = user => {
    return jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.ACCESS_TOKEN_SECRET)
}

exports.verifyToken = token => {
    return new Promise((resolve, reject) => {
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

exports.authCheckMiddleware = async (req,res,next) => {
    if(!req.headers.authorization) res.status(401).send({message : "No Auth Token"})
    let token = req.headers.authorization.split("Bearer ")[1]

    if(!token) {
        res.status(401).send({message: "No token"})
    }
    let payload
    try{
        payload = await this.verifyToken(token)
    }catch (e) {
        console.error(e);
        res.send(e)
    }
    console.log(payload);
    const user = await User.findByPk(payload.id)
    if (!user) return res.status(401).send({message: "Invalid User."})
    req.user = user
    next()
}