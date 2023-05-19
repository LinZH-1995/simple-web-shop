const { Product, Cart } = require('../models')

const productController = {
  getProducts: async (req, res, next) => {
    try {
      const cartId = req.session.cartId
      const [products, cart] = await Promise.all([
        Product.findAll({ raw: true, nest: true }),
        Cart.findByPk(cartId, {
          nest: true,
          include: [
            { model: Product, as: 'items', attributes: ['name', 'price', 'image'], through: { attributes: ['id', 'quantity'] } }
          ]
        })
      ])
      const cartData = cart?.toJSON()
      const totalPrice = cartData?.items ? cartData.items.reduce((acc, cur) => acc + cur.price * cur.CartItem.quantity, 0) : 0
      res.render('products', { products, cart: cartData, totalPrice })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = productController