require("dotenv").config()
const mongoose = require("mongoose")

const MONGODB_URI = process.env['MONGODB_URI']

const initializeDbConnection = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("DB Connection Successful")
    } catch (err) {
        console.log("DB Connection Failed")
    }
}

module.exports = { initializeDbConnection }