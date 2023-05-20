const nodemailer = require('nodemailer')

const { Order, Product, OrderItem, Cart } = require('../models')

const newebpayHelper = require('../helpers/newebpay_helper.js')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ACCOUNT,
    pass: process.env.PASSWORD
  }
})

const orderController = {
  getOrders: async (req, res, next) => {
    try {
      const orders = await Order.findAll({
        nest: true,
        include: [
          { model: Product, as: 'items', attributes: ['name', 'price'], through: { attributes: ['quantity'] } }
        ],
        order: [['paymentStatus', 'ASC']]
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
      const info = await transporter.sendMail({
        from: process.env.ACCOUNT,
        to: process.env.ACCOUNT,
        subject: `${order.id} 訂單成立`,
        html: `<h1>${order.id} 訂單成立</h1>`,
      })
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
      res.redirect('back')
    } catch (err) {
      next(err)
    }
  },

  getPayment: async (req, res, next) => {
    try {
      const id = req.params.id
      const order = await Order.findByPk(id)
      const newebpayInfo = newebpayHelper.getNewebpayInfo(order.amount, '商品資訊', 'root@example.com')
      await order.update({ serialNumber: newebpayInfo.MerchantOrderNo })
      res.render('payment', { order: order.toJSON(), newebpayInfo })
    } catch (err) {
      next(err)
    }
  },

  newebpayCallbackReturnURL: async (req, res, next) => {
    try {
      console.log('===== newebpayCallbackReturnURL =====')
      console.log(req.method)
      console.log(req.query)
      console.log(req.body)
      console.log('==========')
      res.redirect('/orders')
    } catch (err) {
      next(err)
    }
  },

  newebpayCallbackNotifyURL: async (req, res, next) => {
    try {
      console.log('===== newebpayCallbackNotifyURL =====')
      console.log(req.method)
      console.log(req.query)
      console.log(req.body)
      console.log('==========')
      const AES_DecryptCode = newebpayHelper.mpg_aes_decrypt(req.body.TradeInfo)
      const data = JSON.parse(AES_DecryptCode)
      const order = await Order.findOne({ where: { serialNumber: data.Result.MerchantOrderNo } })
      await order.update({ paymentStatus: 1 })
      res.redirect('/orders')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = orderController