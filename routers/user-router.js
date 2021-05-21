const express = require("express")
const router = express.Router()
const lodash = require("lodash")
const {extend} = lodash

const { User } = require("../models/user-model")

//need to get particular users only
router.param("id", async(req, res, next, id) => {
    try {
        const user = await User.findById(id)
        if(!user) {
            return res.status(404).json({success: false, message: "Could Not Retrieve User", errMessage: err.message})
        }
        req.user = user;
        next()
    } catch (err) {
        console.log("Error Occurred :", err.message)
        res.status(400).json({success: false, message: "Error Occurred While Retrieving User", errMessage: err.message})
    }
})

router.route("/:id")
.get((req, res) => {
    let { user } = req
    user.__v = undefined;
    res.status(200).json({success: true, user})
})
.post(async(req, res) => {
    let { user } = req
    let userUpdates = req.body
    video = extend(user, userUpdates)
    try {
        user = await user.save()
        res.status(200).json({success: true, user})
    } catch(err) {
        res.status(400).json({success: false, message: "Error Occurred While Updating User Details", errMessage: err.message})
    }
})
.delete(async(req, res) => {
    let { user } = req
    try {
        await user.remove()
        res.status(200).json({success: true, message: "User Deleted Successfully", errMessage: err.message})
    } catch(err) {
        res.status(400).json({success: false, message: "Error Occurred Deleting User", errMessage: err.message})
    }
})

module.exports = router;