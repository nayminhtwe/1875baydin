const router = require('express').Router()
const {authCheckMiddleware} = require('../../utils/auth')
const {signIn, signUp, profile, userInfo} = require('../controllers/authController')


router.post('/sign-in', signIn)
router.post('/sign-up', signUp)
router.post('/user_info', userInfo)
router.get('/profile', authCheckMiddleware, profile)
module.exports = router