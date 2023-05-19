const { Order, Product, OrderItem, Cart } = require('../models')

const orderController = {
  getOrders: async (req, res, next) => {
    try {
      const orders = await Order.findAll({
        nest: true,
        include: [
          { model: Product, as: 'items', attributes: ['name', 'price'], through: { attributes: ['quantity'] } }
        ]
      })
      const ordersData = orders.map(order => order.toJSON())
      res.render('orders', { orders: ordersData })
    } catch (err) {
      next(err)
    }
  },

  postOrder: async (req, res, next) => {
    try {
      const cartId = req.body.cartId
      const userId = req.user?.id
      delete req.body.cartId
      const [order, cart] = await Promise.all([
        Order.create(Object.assign(req.body, { userId })),
        Cart.findByPk(cartId, { nest: true, include: [{ model: Product, as: 'items', attributes: ['id', 'price'], through: { attributes: ['quantity'] } }] })
      ])
      await Promise.all(Array.from({ length: cart.items.length }, (e, i) => {
        return OrderItem.create({
          price: cart.items[i].price,
          quantity: cart.items[i].CartItem.quantity,
          orderId: order.id,
          productId: cart.items[i].id
        })
      }))
      res.redirect('/orders')
    } catch (err) {
      next(err)
    }
  },

  cancelOrder: async (req, res, next) => {
    try {
      const id = req.params.id
      const [order, orderItems] = await Promise.all([
        Order.findByPk(id),
        OrderItem.findAll({ where: { orderId: id } })
      ])
      await Promise.all(Array.from({ length: orderItems.length }, (e, i) => orderItems[i].destroy()))
      await order.destroy()
      console.log(order, '-------', orderItems)
      res.redirect('back')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = orderController