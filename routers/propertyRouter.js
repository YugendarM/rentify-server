const express = require("express")
const { addProperty  } = require("../controllers/propertyController")
const authenticateUser = require("../middleware/authenticateUser")

const route = express()

route.post('/add', authenticateUser, addProperty)
// route.post('/login', userLogin)

module.exports = route