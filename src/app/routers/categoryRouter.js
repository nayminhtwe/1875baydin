const router = require('express').Router()
const Controller = require('../controllers/categoryController')

router.route("/").get(Controller.all)

router.route("/:id").get(Controller.findOne)

module.exports = router