const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'});
}

// Register User
// POST --> /api/auth/register
const registerUser = async (req, res) => {
    const { name, email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: "User alrady exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({name, email, password: hashedPassword});
        if(user){
            const otp = Math.floor( 100000 + Math.random() * 900000).toString();

            const message = `
            Welcome to Shopnet ${name} 
            your OTP for registration is ${otp}`;

            await sendEmail(email, "Welcome to Shopnet - your OTP for regisation ", message);

            res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
        }else{
            res.status(400).json({message: "Invalid user data"})
        }   

    }catch(error){
        res.status(500).json({message: error.message})
    }
}


// login user
// POST --> /api/auth/login
const loginuser = async (req, res) => {
    const { email, password } = req.body

    try {

        const user = await User.findOne({email})

        if(user && (await bcrypt.compare(password, user.password))){
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email:user.email,
                role: user.role,
                token: generateToken(user._id)
            })
        }else{
            res.status(400).json({
            message: "Invalid email or password "
        })
        }
    } catch (error) {

        res.status(500).json({
            message: "server error"
        })
  
    }
}


// getUsers route
// admin route
// GET --> /api/auth/users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password')
        res.status(200).json(users)
        
    } catch (error) {
        res.status(500).json({
            message: "server error"
        })
        
    }

}

module.exports = {
    registerUser,
    loginuser,
    getUsers
};