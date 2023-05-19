const express = require('express')
const router = express.Router()

const cartController = require('../../controllers/cartController.js')

router.patch('/:id/increment', cartController.incrementCartItemQuantity)

router.patch('/:id/decrement', cartController.decrementCartItemQuantity)

router.delete('/:id', cartController.deleteCartItem)

module.exports = router