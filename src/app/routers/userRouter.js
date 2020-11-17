const router = require('express').Router()
const {authCheckMiddleware} = require('../../utils/auth')
const {signIn, signUp, profile} = require('../controllers/authController')


router.post('/sign-in', signIn)
router.post('/sign-up', signUp)
router.get('/profile', authCheckMiddleware, profile)
module.exports = router