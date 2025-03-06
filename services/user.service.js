const User = require("../models/user.model");

const createUser = async (userData) => {
    try{
        console.log("Server",userData)
        const user = await User.create(userData);
        return user;
    }
    catch (error) {
       
        console.log("Error",error)
    }


}

module.exports = { createUser};