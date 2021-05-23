const jwt = require("jsonwebtoken");
const config = require("../config/auth-config.js");

const { User } = require("../models/user-model")

const verifyToken = (req, res, next) => {
    try {
        let token = req.headers["x-access-token"]
        if(!token) {
            return res.status(403).json({success: false, message: "no token provided"})
        }
        jwt.verify(token, config.secret, () => {
            req.userId = decoded.id;
            next()
        })
    } catch (err) {
        res.status(400).json({success: false, message: "error occured while verifying token"})
    }
} 

const authJWT = { verifyToken }
module.exports = { authJWT };
