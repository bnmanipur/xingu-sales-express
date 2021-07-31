const express = require('express');
const router = express.Router();

const itemsRoute = require('./admin/items')
const masterRoute = require('./admin/master')
const ordersRoute = require('./admin/orders')
const quotationRoute = require('./admin/quotation')
const repairingRoute = require('./admin/repairing')
const worklistRoute = require('./admin/worklist')
const notificationRoute = require('./admin/notification')
const courierRoute = require('./admin/courier')

const adminController = require('../controllers/admin')

router.use((req, res, next) => {
    if(!req.session.userId){
        res.redirect("/login")
    }else{
        next()
    }
})

router.get('/dashboard', adminController.dashboard);

router.use('/items', itemsRoute)
router.use('/master', masterRoute)
router.use('/orders', ordersRoute)
router.use('/quotation', quotationRoute)
router.use('/repairing', repairingRoute)
router.use('/worklist', worklistRoute)
router.use('/notification', notificationRoute)
router.use('/courier', courierRoute)

module.exports = router;
