const Order = require('../../../models/Order')
const moment = require('moment')

module.exports = () => {
    return {
        store: async (req, res) => {
            //Validate Request
            try {
                const { phone, address } = req.body
                if (!phone || !address) {
                    req.flash('error', 'All Fields are Required')
                    return res.redirect('/cart')
                }
                const order = new Order({
                    customerId: req.user._id,
                    items: req.session.cart.items,
                    phone,
                    address,
                })
                await order.save()
                req.flash('success', 'Order Placed Successfully')
                delete req.session.cart
                return res.redirect('/customer/orders')
            } catch (error) {
                req.flash('error', 'Something went Wrong')
                return res.redirect('/')
            }
        },
        index: async (req, res) => {
            const orders = await Order.find({ customerId: req.user._id }, null, { sort: { 'createdAt': -1 } })
            res.header('Cache-Control', 'no-cahce,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0')
            res.render('customer/orders', { orders, moment: moment })
        }
    }
}