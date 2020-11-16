const router = require('express').Router()
const Controller = require('../controllers/formController')

router.route('/create').post(Controller.create)

module.exports = router