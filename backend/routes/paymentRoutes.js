const express = require('express')
const { createdOrder, verifyPayments } = require('../controller/paymentController')


const router = express.Router()


router.post("/order", createdOrder)
router.post("/verify", verifyPayments)

module.exports = router