const Order = require('../model/Order')
const Product = require('../model/Product')
const User = require('../model/User')


const getAdminStats = async (req, res) => {
    try {
        // countDocuments --> find all order and gives it final count
        const toatlOrder = await Order.countDocuments({})
        const toatlProduct = await Product.countDocuments({})
        const toatlUsers = await User.countDocuments({role: "user"})

        const orders = await Order.find({})
        const totalRevenue = orders.reduce((acc, item) => acc + item.totalAmout , 0)

        res.json({
            toatlOrder,
            totalRevenue,
            toatlUsers,
            toatlProduct
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}

module.exports = {
    getAdminStats
}