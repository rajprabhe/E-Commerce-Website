const Order = require('../model/Order')
const sendEmail = require('../utils/sendEmail')

// POST -->/api/orders/
// user order product
const addOrderItems = async (req, res) => {
    try {
        const { items, totalAmout, address, paymentId } = req.body
        if (items && items.length === 0) {

            return res.status(400).json({
                message: 'No order itemes'
            })

        } else {
            const order = new Order({
                userId: req.user._id,
                items,
                totalAmout,
                address,
                paymentId
            })

            const createOrder = await order.save()

            // send order confirmation Email
            const message = `
        <h2>Order Confirmation</h2>
        <p>Hello ${req.user.name},</p>
        <p>Your order has been successfully placed! Order ID: <strong>${createOrder._id}</strong></p>
        <p>Total Amount Paid: $${totalAmout.toFixed(2)}</p>
        <p>It will be shipped to: ${address.street}, ${address.city}</p>
        <p>Thank you for shopping with ShopNest!</p>
      `;

            await sendEmail({
                email: req.user.email,
                subject: 'ShopNest - Order Confirmation',
                message
            })

            res.status(201).json(createOrder)

        }
    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}


// GET -->/api/orders/myorder
// user product data shows
const getMyOrders = async (req, res) => {

    try {
        const orders = await Order.find({ userId: req.user._id })
        res.json(orders)
    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }
}



/**

Order.find({})
Finds all orders from the orders collection.
.populate('userId', 'id name')
Replaces the userId ObjectId with the actual user document.
Only fetches the name field (and _id by default).
Example
User Collection
{
  "_id": "64f123abc",
  "name": "Raj",
  "email": "raj@gmail.com"
}
Order Collection
{
  "_id": "78a456xyz",
  "product": "Laptop",
  "price": 50000,
  "userId": "64f123abc"
}
Without populate()
const orders = await Order.find({});

Output:

[
  {
    "_id": "78a456xyz",
    "product": "Laptop",
    "price": 50000,
    "userId": "64f123abc"
  }
]

Here userId is just an ObjectId.

With populate()
const orders = await Order.find({})
  .populate('userId', 'name');

Output:

[
  {
    "_id": "78a456xyz",
    "product": "Laptop",
    "price": 50000,
    "userId": {
      "_id": "64f123abc",
      "name": "Raj"
    }
  }
]

Now userId contains the actual user document.
*/


// POST -->/api/orders
// Admin route
// show admin all details
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('userId', '_id name')
        res.json(orders)
    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}


// POST -->/api/orders/:id/status
// Admin route
// Admin update status
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if (order) {
            order.status = req.body.status || order.status
            const updateOrder = await order.save()
            res.json(updateOrder)
        } else {
            res.status(404).json({
                message: 'Order not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}

module.exports = {
    addOrderItems,
    getMyOrders,
    getOrders,
    updateOrderStatus
};