const express = require('express')
const router = express.Router()

const cartController = require('../../controllers/cartController.js')

router.get('/', cartController.getCart)

module.exports = router