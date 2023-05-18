const { Cart, Product } = require('../models')

const cartController = {
  getCart: async (req, res, next) => {
    try {
      const cart = await Cart.findOne({
        nest: true,
        include: [
          { model: Product, as: 'items', attributes: ['name', 'price', 'image'], through: { attributes: ['id', 'quantity'] } }
        ]
      })
      const cartData = cart.toJSON()
      const totalPrice = cartData.items ? cartData.items.reduce((acc, cur) => acc + cur.price * cur.CartItem.quantity, 0) : 0
      res.render('cart', { cart: cartData, totalPrice })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = cartController