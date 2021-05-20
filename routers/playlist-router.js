const express = require("express")
const router = express.Router()
const lodash = require("lodash")
const {extend} = lodash

const { Playlist } = require("../models/playlist-model")

router.route("/")
.get(async(req, res) => {
    try {
        const playlists = await Playlist.find({})
        res.status(200).json({success: true, receivedData: playlists})
    } catch(err) {
        console.log("Error Occurred :", err.message)
        res.status(400).json({success: false, message: "Error Occurred Retrieving Playlists", errMessage: err.message})
    }
})
.post(async(req, res) => {
    try {
        const playlist = req.body
        const newPlaylist = new Playlist(playlist)
        const savePlaylist = await newPlaylist.save()
        res.status(200).json({success: true, sentData: savePlaylist})
    } catch(err) {
        console.log("Error Occurred :", err.message)
        res.status(400).json({success: false, message: "Error Occurred While Adding Playlist", errMessage: err.message})
    }
})

router.param("id", async(req, res, next, id) => {
    try {
        const playlist = await Playlist.findById(id);
        if(!playlist) {
            return res.status(404).json({success: false, message: "Could Not Find Playlist"})
        }
        req.playlist = playlist;
        next()
    } catch(err) {
        console.log("Error Occurred :", err.message)
        res.status(400).json({success: false, message: "Error Occurred While Retrieving Playlist", errMessage: err.message})
    }
})

router.route("/:id")
.get((req, res) => {
    let { playlist } = req;
    playlist.__v = undefined;
    res.status(400).json({success: true, receivedData: playlist})
})
.post(async (req, res) => {
    let { playlist } = req;
    let playlistUpdates = req.body
    playlist = extend(playlist, playlistUpdates)
    try {
        playlist = await playlist.save()
        res.status(200).json({success: true, sentData: playlist})
    } catch (err) {
        res.status(400).json({success: false, message: "Error Occurred Updating Playlist", errMessage: err.message})
    }
})
.delete(async (req, res) => {
    let { playlist } = req
    try {
        await playlist.remove()
        res.status(200).json({success: true, message: "Playlist Deleted Successfully"})
    } catch (err) {
        res.status(400).json({success: false, message: "Error Occurred Playlist Video", errMessage: err.message})
    }
})
  
module.exports = router;