const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userRouter = require("./routes/user.routes")
const employeeRouter = require("./routes/employee.routes")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())

app.use("/",userRouter)
app.use("/employees",employeeRouter)
app.listen(process.env.port,async()=>{
    try {
        await mongoose.connect(process.env.mongoUrl)
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running at port ${process.env.port}`)
})
