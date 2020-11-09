const router = require('express').Router()
const Controller = require('../controllers/contentController')

router.route('/').get(Controller.contents)

module.exports = router