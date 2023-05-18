const express = require('express')
const router = express.Router()

const products = require('./modules/products.js')
const cart = require('./modules/cart.js')

router.use('/products', products)

router.use('/cart', cart)

router.get('/', (req, res) => res.redirect('/products'))

module.exports = router