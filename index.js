require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const { initializeDbConnection } = require("./db/db-setup")
initializeDbConnection();

const app = express()
app.use(bodyParser.json());
app.use(cors())
const PORT = process.env["PORT"]

const videoRouter = require("./routers/video-router");
const userRouter = require("./routers/user-router");
const categoryRouter = require("./routers/category-router");
const playlistRouter = require("./routers/playlist-router");
const authRouter = require("./routers/auth-router");

const verifyToken = require("./middlewares/verify-signin")

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/playlists", playlistRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.send("Video Library Backend")
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})