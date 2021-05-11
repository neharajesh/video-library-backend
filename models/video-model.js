const mongoose = require("mongoose")
const { Category } = require("./category-model")
const { Schema } = mongoose
require("mongoose-type-url")

const VideoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    videoId: {
        type: String,
        required: true
    },
    duration: Date,
    tags: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: Category
    }],
    uploadDate: {
        type: Date,
        required: true
    },
    rating: {
        type: Number, 
        required: true
    },
    pgRating: {
        type: String,
        required: true
    },
    views: Number,
    likes: Number,
    description: String,
    thumbnail: String

})