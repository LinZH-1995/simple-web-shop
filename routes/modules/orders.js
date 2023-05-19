const express = require('express')
const router = express.Router()

const orderController = require('../../controllers/orderController.js')

router.post('/:id/cancel', orderController.cancelOrder)

router.post('/', orderController.postOrder)

router.get('/', orderController.getOrders)

module.exports = router