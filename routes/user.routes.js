const express = require("express");
const UserModel = require("../models/user.model");
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

userRouter.post("/signup",(req,res)=>{
    const {email,password,confirmPassword} = req.body
    try {
        bcrypt.hash(password, 5, async(err, hash) =>{
            const user = new UserModel({email,password:hash,confirmPassword:hash})
            await user.save()
            res.send({"msg":"Signup Successful"})
        });
    } catch (error) {
        res.send({"msg":error.message})
    }
    
})

userRouter.post("/login",(req,res)=>{
    const {email,password} = req.body
    try {
        const user = UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,async(err,result)=>{
                res.send({"msg":"Login Successful","token":jwt.sign({ "userID": user._id }, 'sb1234')})
            })
        }else{
            res.send({"msg":"Invalid Credentials"})
        }
    } catch (error) {
        res.send({"msg":error.message})
    }
})

module.exports=userRouter