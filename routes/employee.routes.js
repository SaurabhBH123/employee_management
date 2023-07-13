const express = require("express")
const EmployeeModel = require("../models/employee.model")
const employeeRouter = express.Router()

employeeRouter.post("/",async(req,res)=>{
    const payload = req.body

    try {
        const newEmp = new EmployeeModel(payload)
        await newEmp.save()
        res.send({"msg":"New Employee Added"})
    } catch (error) {
        res.send({"msg":error.message})
    }
})

employeeRouter.get("/",async(req,res)=>{
    const {dept} = req.query

    try {
        const query = {}
        if(dept){
            query.dept = dept
        }
        const employees = await EmployeeModel.find(query)
        res.send(employees)
    } catch (error) {
        res.send({"msg":error.message})
    }
})

module.exports = employeeRouter