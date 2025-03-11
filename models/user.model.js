const mongoose = require('mongoose');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

    const userSchema = new mongoose.Schema(
        {
            full_name:{
                first_name:{
                    type:String,
                    required:true,
                },
                last_name:{
                    type:String,
                    required:true,   
                }
            },
            email:{
                type:String,
                required:true,
            },
            password:{
                type:String,
                required:true,
                unique:true,
            },
          
        },
    {timestamps:true}
)

userSchema.methods.generatorJWT = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: "1h",
    });
};

userSchema.statics.hashPassword = async function (password) {
    return await bcrpyt.hash(password,10);
};

userSchema.methods.comparePassword = async function(password) {
    return await bcrpyt.hash(password, this.password);
};

const User = mongoose.model("User", userSchema);


module.exports=User;