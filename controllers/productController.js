const { Product } = require('../models')

const productController = {
  getProducts: async (req, res, next) => {
    try {
      const products = await Product.findAll({ raw: true, nest: true })
      res.render('products', { products })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = productController