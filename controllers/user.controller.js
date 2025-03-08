const User = require("../models/user.model");
const {createUser,getUserByEmail} = require("../services/user.service")
const {validationResult} = require('express-validator');
const jwt = require("jsonwebtoken");

const registerUser = async (req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
    })
    }


    const {full_name, email, password}= req.body;
    console.log(req.body);

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

const loginUser = async (req,res) => {

    const {email, password} = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
   
    

    try{

        const user = await getUserByEmail(email);
        if(!user) {
            return res.status(401).json({
                message: "Invalid credentials",
            })
        }


        //compare password
        const isPasswordValid = await user.comparePassword(password);
        // console.log(isPasswordValid);
        if(!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or passwsord",
            });
        }

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{
            expiresIn: "1h",
        })

        return res.status(200).json({
            message: "User logged in successfully",
            token,
            user:{
                id:user._id
            }
        });

    }catch(error) {
        return res.status(404).json({
            message: error.message,
        });
    }

}

module.exports = {registerUser,loginUser};