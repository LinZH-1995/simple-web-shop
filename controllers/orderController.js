const { Order, Product } = require('../models')

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
      console.log(ordersData[1].items)
      res.render('orders', { orders: ordersData })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = orderController