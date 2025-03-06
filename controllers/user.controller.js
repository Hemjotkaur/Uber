const User = require("../models/user.model");
const {createUser} = require("../services/user.service")
const {validationResult} = require('express-validator');

const registerUser = async (req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
    })
    }


    const {full_name, email, password}= req.body;
    // console.log(req.body);

    const hashedPassword = await User.hashPassword(password);
    
    const user = await createUser({
        full_name,
        email,
        password: hashedPassword,
    })
 
    return res.status(201).json({
        message: "User created successfully",
        user,
    });
   
}

module.exports = {registerUser};