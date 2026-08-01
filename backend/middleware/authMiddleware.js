const jwt = require('jsonwebtoken')
const User = require('../model/User')

const protect = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;

        // Check authorization header exists
        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization header missing"
            });
        }

        // Check Bearer format
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Invalid token format. Use Bearer token"
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Token not found"
            });
        }

        // Verify JWT token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Find user from decoded id
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        // Attach user to request
        req.user = user;

        next();

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            message: "Not authorized",
            error: error.message
        });
    }
};



module.exports = {
   protect 
};