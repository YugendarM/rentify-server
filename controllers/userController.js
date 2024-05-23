const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_TOKEN = process.env.JWT_TOKEN

const userSignup = async(request, response) => {
    const userData = request.body
    try{
        const existingUser = await userModel.findOne({email: userData.email})
        if(existingUser){
            return response.status(401).send({message: "User already exist"})
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10)
        const newUser = new userModel({
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            phoneNo: userData.phoneNo,
            role: userData.role,
            password: hashedPassword
        })
        const addedUser = await newUser.save()
        return response.status(201).send(addedUser)
    }
    catch(error){
        response.status(500).send({message: error.message})
    }
}

const userLogin = async(request, response) => {
    const userData = request.body
    try{
        const validUser = await userModel.findOne({email: userData.email})
        if(!validUser){
            return response.status(404).send({message: "User not registered"})
        }
        if(await bcrypt.compare(userData.password, validUser.password)){
            const AUTH_TOKEN = jwt.sign({email: validUser.email, role: validUser.role}, JWT_TOKEN)
            return response.status(200).send({token: AUTH_TOKEN})
        }
    }
    catch(error){
        response.status(500).send({message: error.message})
    }
}


module.exports = {userSignup, userLogin }