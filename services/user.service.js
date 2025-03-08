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

const getUserByEmail = async (email) => {

    try{
        const user = await User.findOne({email});
        if(!user) {
            throw new Error("User not found");
        }
        return user;
    }catch(error) {
        console.log("Error",error)
    }
}

const getUserbyId = async(userId)=>{
    try{
        const user = await User.findById(userId);  
        return user;
    }catch(error){
        console.log("Error",error)
    }
}

module.exports = { createUser, getUserByEmail ,getUserbyId};