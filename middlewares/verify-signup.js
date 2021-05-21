const { User } = require("../models/user-model")

checkDuplicateUsername = async (req, res, next) => {
    try{ 
        const user = await User.findOne({username: req.body.username});
        console.log(user)
        if(user) {
            return res.status(400).json({ success: false, message: "Username already in use, try another"})
        }
        next()
    } catch (err) {
        return res.status(500).json({success: false, message: "Could not fetch details", errMessage: err.message})
    }
}

module.exports = { checkDuplicateUsername }