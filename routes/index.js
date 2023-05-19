const express = require('express')
const router = express.Router()

const products = require('./modules/products.js')
const cart = require('./modules/cart.js')
const cartItem = require('./modules/cartItem.js')

router.use('/products', products)

router.use('/cart', cart)

router.use('/cartItem', cartItem)

router.get('/', (req, res) => res.redirect('/products'))

module.exports = router