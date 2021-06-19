const router = require('express').Router()
const controller = require('../controllers/subscriptionController')

router.route("/subscribe").post(controller.subscribe)
router.route("/precreate").get(controller.preCreate)

module.exports = router