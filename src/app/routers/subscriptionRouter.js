const router = require('express').Router()
const controller = require('../controllers/subscriptionController')

router.route("/subscribe").post(controller.subscribe)
router.route("/precreate").post(controller.preCreate)
router.route("/callback").post(controller.kbzCallback)

module.exports = router