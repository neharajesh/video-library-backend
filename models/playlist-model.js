const mongoose = require("mongoose")
const { Schema } = mongoose

const PlaylistSchema = new Schema({
    playlistName: {
        type: String,
        required: true
    },
    createdOn: Date,
    videoList: [{
        type: Schema.Types.ObjectId,
        ref: Video
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: User
    }
})

const Playlist = mongoose.model("Playlist", PlaylistSchema)

module.exports = { Playlist }