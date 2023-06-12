const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()
const route = require("./routes/routes")

const app = express()

app.use(express.json())

mongoose.set('strictQuery', false)

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
})
    .then(() => {console.log("MongoDB is connected")})
    .catch((err) => {console.log(err.message)})

app.use("/", route)

app.listen(process.env.PORT || 3000, function () {
    console.log("Express app running on port 3000")
})
