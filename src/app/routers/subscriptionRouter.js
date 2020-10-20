const router = require('express').Router()
const controller = require('../controllers/subscriptionController')

router.route("/subscribe").post(controller.subscribe)

module.exports = router