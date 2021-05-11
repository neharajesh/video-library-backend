const express = require("express")
const router = express.Router()
const lodash = require("lodash")
const {extend} = lodash

const { Video } = require("../models/video-model")

router.route("/")
.get(async(req, res) => {
    try {
        const videos = await Video.find({})
        res.status(200).json({success: true, videos})
    } catch(err) {
        console.log("Error Occurred :", err.message)
        res.status(400).json({success: false, message: "Error Occurred Retrieving Videos", errMessage: err.message})
    }
})
.post(async(req, res) => {
    try {
        const video = req.body
        const newVideo = new Video(video)
        const saveVideo = await newVideo.save()
        res.status(200).json({success: true, saveVideo})
    } catch(err) {
        console.log("Error Occurred :", err.message)
        res.status(400).json({success: false, message: "Error Occurred While Adding Videos", errMessage: err.message})
    }
})

router.param("id", async(req, res, next, id) => {
    try {
        const video = await Video.findById(id);
        if(!video) {
            return res.status(404).json({success: false, message: "Could Not Find Product"})
        }
        req.video = video;
        next()
    } catch(err) {
        console.log("Error Occurred :", err.message)
        res.status(400).json({success: false, message: "Error Occurred While Retrieving Product", errMessage: err.message})
    }
})

router.route("/:id")
.get((req, res) => {
    let { video } = req;
    video.__v = undefined;
    res.status(400).json({success: true, video})
})
.post(async (req, res) => {
    let { video } = req;
    let videoUpdates = req.body
    video = extend(video, videoUpdates)
    try {
        video = await video.save()
        res.status(200).json({success: true, video})
    } catch (err) {
        res.status(400).json({success: false, message: "Error Occurred Updating Video", errMessage: err.message})
    }
})
.delete(async (req, res) => {
    let { video } = req
    try {
        await video.remove()
        res.status(200).json({success: true, message: "Video Deleted Successfully"})
    } catch (err) {
        res.status(400).json({success: false, message: "Error Occurred Deleting Video", errMessage: err.message})
    }
})
  
module.exports = router;