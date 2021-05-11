const express = require("express")
const router = express.Router()

const { Category } = require("../models/category-model")

router.route("/")
.get(async(req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).json({success: true, categories})
    } catch(err) {
        console.log("Error Occurred :", err.message)
        res.status(400).json({success: false, message: "Error Occurred Retrieving Categories", errMessage: err.message})
    }
})
.post(async(req, res) => {
    try {
        const category = req.body
        const newCategory = new Category(category)
        const savedCategory = await newCategory.save()
        res.status(200).json({success: true, savedCategory})
    } catch(err) {
        console.log("Error Occurred :", err.message)
        res.status(400).json({success: false, message: "Error Occurred Adding Category", errMessage: err.message})
    }
})

module.exports = router;