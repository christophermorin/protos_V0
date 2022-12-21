const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server is running on port ${config.PORT}`)
})







// const express = require("express")
// const app = express()
// const PORT = 3000
// const mongoose = require("mongoose")

// require("dotenv").config()

// const mongoUrl = process.env.DB_URI
// mongoose.connect(mongoUrl, false)
//   .then(() => {
//     console.log("Connected to DB")
//   })
//   .catch(err => console.log(err))

// app.get("/api/v1", (req, res) => {
//   console.log("getting")
//   res.send("Hello World")
// })

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`))