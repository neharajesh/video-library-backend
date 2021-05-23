const { checkDuplicateUsername } = require("../middlewares/verify-signup");
const config = require("../config/auth-config");
const { User } = require("../models/user-model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express")
const router = express()

router.route("/signup")
.post(async (req, res) => {
  try {
    const user = req.body
    const newUser = new User({ ...user,  password: bcrypt.hashSync(req.body.password, 8)});
    const doesUserExist = await User.findOne({username: newUser.username})
    if(doesUserExist) {
      console.log("username exists")
      return res.json({ success: false, message: "Username already in use, try another"})
    }
    const savedUser = await newUser.save();
    res.status(200).json({success: true, message: "user registered successfully", user: savedUser})
  } catch (err) {
      console.log("error occurred while signing up")
  }
})

router.route("/signin")
.post(async (req, res) => {
  try {
      const user = await User.findOne({username: req.body.username})
      if(!user) {
          return res.status(200).json({success: false, message: "User not found"})
      }      
      const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
      );    
      if(!passwordIsValid) {
          return res.status(200).json({success: false, message: "Invalid password", auth_token: null})
      }
      const token = jwt.sign({id: user._id}, config.secret, {
          expiresIn: 86400
      })
      res.status(200).json({success: true, message: "login successful", user: {
          name: user.name,
          username: user.username,
          auth_token: token }
      })
      console.log(user)
  } catch (err) {
      console.log("Error occurred while processing signin", err.message)
  }
})

module.exports = router