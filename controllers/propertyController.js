const propertyModel = require("../models/propertyModel")

const addProperty = async(request,response) => {
    const propertyData = request.body
    const userData = request.user
    try{
        if(userData.role === "seller"){
            const addedPropertyData = await propertyModel.create(propertyData)
            return response.status(201).send(addedPropertyData)
        }
        return response.status(404).send({message: "Not an authorized Seller"})
    }
    catch(error){
        response.status(500).send({message: error.message})
    }
}

const getMyProperties = (request, response) => {
    const userData = request.user
    try{

    } 
    catch(error){
        
    }
}


module.exports = {addProperty, getMyProperties}