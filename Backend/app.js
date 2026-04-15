const express = require("express")
const cors = require("cors")
const moviesRoutes = require("./routes/movies")

const app = express()

app.use(cors())
app.use(express.json())

// Issue #2 — Test route
app.get("/test", (req, res) => {
    res.json({ message: "Server is working" })
})

app.use("/movies", moviesRoutes)

module.exports = app