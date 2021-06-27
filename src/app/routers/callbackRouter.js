const router = require('express').Router()
const controller = require('../controllers/callbackController')

router.route("/callback").post(controller.kbzCallback)

module.exports = router