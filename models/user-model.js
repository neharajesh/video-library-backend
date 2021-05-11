const mongoose = require("mongoose")
const { Schema } = mongoose
const { Video } = require("./video-model")
require("mongoose-type-url")

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    age: {
        type: Number,
        required: true
    }, 
    image: mongoose.SchemaTypes.Url,
    uploads: [{
        type: Schema.Types.ObjectId,
        ref: Video
    }],
    likedVideos: [{
        type: Schema.Types.ObjectId,
        ref: Video
    }],
    watchedVideos: [{
        type: Schema.Types.ObjectId,
        ref: Video
    }], 
    watchLaterVideos: [{
        type: Schema.Types.ObjectId,
    }]
})

const User = mongoose.model("User", UserSchema)

module.exports = { User }