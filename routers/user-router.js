const express = require("express")
const router = express.Router()
const lodash = require("lodash")
const {extend} = lodash

const { User } = require("../models/user-model")

//signup => new users
router.post("/signup", async (req, res) => {
    const user = req.body
    try {
        //check if username is present in DB
        const existingUser = User.find({username: user.username})
        //if it is there, ask user to retype username
        if(!existingUser) {
            return res.json({success: false, message: "Username exists, choose another!"})
        }
        const newUser = new User(user)
        const savedUser = await newUser.save()
        return res.status(200).json({success: true, savedUser})
        //if it is not there, add user details to db
    } catch (err) {
        console.log("Error Occurred while Signing up", err.message);
    }
})

//signin
router.post("/signin", async (req, res) => {
    const user = req.body
    try {
        //check if user exists
        const existingUser = await User.findOne({ username: user.username }).exec()
        if(!existingUser) {
            console.log("This user does not exist, signup")
            return res.json({success: false, message: "This user does not exist, please signup to continue"})
        }
        if(existingUser.password === user.password) {
            console.log("Password Matches")
            return res.json({success: true, message: "Login successful", existingUser})
        }
        return res.json({success: false, message: "Login failed, recheck password"})
    } catch (err) {
        console.log("Error Occurred while Signing in", err.message)
    }
})

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