const express = require('express')
const router = express.Router()
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const customerOrderController = require('../app/http/controllers/customers/orderController')
const adminOrderController = require('../app/http/controllers/admin/orderController')

//MiddleWares
const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')
const admin = require('../app/http/middleware/admin')


router.get('/', homeController().index)


router.get('/login', guest, authController().login)
router.post('/login', authController().postLogin)


router.get('/register', guest, authController().register)
router.post('/register', authController().postRegister)


router.get('/cart', cartController().index)
router.post('/update-cart', cartController().update)


router.post('/logout', authController().logout)

//Customer Routes
router.post('/orders', auth, customerOrderController().store)
router.get('/customer/orders', auth, customerOrderController().index)

//Admin Routes
router.get('/admin/orders', admin, adminOrderController().index)


module.exports = router