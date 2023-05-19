const express = require('express')
const router = express.Router()

const products = require('./modules/products.js')
const cart = require('./modules/cart.js')
const cartItem = require('./modules/cartItem.js')
const orders = require('./modules/orders.js')

router.use('/products', products)

router.use('/cart', cart)

router.use('/cartItem', cartItem)

router.use('/orders', orders)

router.get('/', (req, res) => res.redirect('/products'))

module.exports = router