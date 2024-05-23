const express = require("express")
const { userSignup, userLogin, getSellerDetails  } = require("../controllers/userController")
const authenticateUser = require("../middleware/authenticateUser")

const route = express()

route.post('/signup', userSignup)
route.post('/login', userLogin)

//Buyer
route.get('/seller',authenticateUser, getSellerDetails)

module.exports = route