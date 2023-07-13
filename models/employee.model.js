const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    dept:String,
    salary:Number
})

const EmployeeModel = mongoose.model("employee",employeeSchema)

module.exports=EmployeeModel