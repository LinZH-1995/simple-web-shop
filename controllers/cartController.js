const { Cart, Product, CartItem } = require('../models')

const cartController = {
  getCart: async (req, res, next) => {
    try {
      const cartId = req.session.cartId
      const cart = await Cart.findByPk(cartId, {
        nest: true,
        include: [
          { model: Product, as: 'items', attributes: ['name', 'price', 'image'], through: { attributes: ['id', 'quantity'] } }
        ]
      })
      const cartData = cart?.toJSON()
      const totalPrice = cartData?.items ? cartData.items.reduce((acc, cur) => acc + cur.price * cur.CartItem.quantity, 0) : 0
      res.render('cart', { cart: cartData, totalPrice })
    } catch (err) {
      next(err)
    }
  },

  postCart: async (req, res, next) => {
    try {
      const [cart, cart_created] = await Cart.findOrCreate({
        where: { id: req.session.cartId || null }
      })
      const cartId = cart.id
      const productId = req.body.productId
      const [cartItem, cartItem_created] = await CartItem.findOrCreate({
        where: { cartId, productId },
        defaults: { quantity: 1, cartId, productId }
      })
      if (!cartItem_created) await cartItem.increment('quantity')
      req.session.cartId = cartId
      res.redirect('back')
    } catch (err) {
      next(err)
    }
  },

  incrementCartItemQuantity: async (req, res, next) => {
    try {
      const id = req.params.id
      const cartId = req.session.cartId
      const cartItem = await CartItem.findOne({ where: { id } })
      if (cartItem.cartId === cartId) await cartItem.increment('quantity')
      res.redirect('back')
    } catch (err) {
      next(err)
    }
  },

  decrementCartItemQuantity: async (req, res, next) => {
    try {
      const id = req.params.id
      const cartId = req.session.cartId
      const cartItem = await CartItem.findOne({ where: { id } })
      if (cartItem.quantity > 1 && cartItem.cartId === cartId) await cartItem.decrement('quantity')
      res.redirect('back')
    } catch (err) {
      next(err)
    }
  },

  deleteCartItem: async (req, res, next) => {
    try {
      const id = req.params.id
      const cartId = req.session.cartId
      const cartItem = await CartItem.findOne({ where: { id } })
      if (cartItem.cartId === cartId) await cartItem.destroy()
      res.redirect('back')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = cartController