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

app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/categories", categoryRouter);

app.get("/", (req, res) => {
    res.send("Video Library Backend")
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})