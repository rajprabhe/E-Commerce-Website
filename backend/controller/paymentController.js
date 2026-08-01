const Razorpay = require('razorpay')
const crypto = require('crypto')


const createdOrder = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })

        // Razorpay accept amount in paisa
        const options = {
            amount: req.body.amount * 100 , // razorpay accept amont in pass --> ₹ 100 paisa = ₹ 1 rupess
            currency: "INR"
        }

        const order = await instance.orders.create(options)

        if(!order){
            return res.status(500).json({
                message: "Some Error Occured"
            })
        }

        res.status(order)
        
    } catch (error) {
        res.status(500).json({
            message: "Error occured"
        })  
    }
}



const verifyPayments = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSign = crypto.createHash("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString()).hex('hex')

        if(razorpay_signature === expectedSign){
            return res.status(200).json({
                message: "Payment verified successfully"
            })
        }else{
            return res.status(400).json({
                message: "Invalid signature sent"
            })
        }  
    } catch (error) {
        res.status(500).json({
            message: "Error"
        }) 
    }
}

module.exports = {
    createdOrder,
    verifyPayments
};