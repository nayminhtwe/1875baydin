const router = require('express').Router()
const controller = require('../controllers/subscriptionController')

router.route("/subscribe").post(controller.subscribe)
router.route("/precreate").get(controller.preCreate)
router.route("/callback").get(controller.kbzCallback)

module.exports = router