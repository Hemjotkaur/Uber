const {createCaptain,loginCaptainByEmail,getCaptainById} = require("../services/captain.service")
const Captain = require('../models/captain.model')

const registerCaptain = async(req,res)=>{
 console.log(req.body);
    const {fullname,email,password,vehicle}=req.body;
    const hashedPassword = await Captain.hashPassword(password);

    const captain = await createCaptain({fullname,email,password:hashedPassword,vehicle});
    return res.status(201).json({
        message:"Created.",
        captain:{
            _id:captain._id,
            fullname:captain.fullname,
            email:captain.email,
            vehicle:captain.vehicle
        }
    })
}

const loginCaptain = async (req,res) =>{
    console.log(req.body);
    const {email,password}= req.body;
    const captain= await loginCaptainByEmail(email);
    
    if(!captain) {
        return res.status(401).jaon({
            messgae:"Invalid email or password"
        })
    }
    
    console.log(captain)
    const isPasswordValid = await captain.comparePassword(password);
    if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid email or password...",
        });
      }
    
      const token = captain.generateJWT();
    
      return res.status(200).json({
        message: "Login successful...",
        token,
      });

}

const getCaptainProfile = async (req,res) => {
    const captainId = req.captain.id;
    console.log(captainId)

    const captain = await getCaptainById(captainId);
    if(!captain){
        return res.json({
          message:"Captain NOT Exists.."
        })
      }

    return res.status(200).json({
        message:"Captain Details...",
        captain:{
            _id:captain._id,
            fullname:captain.fullname,
            email:captain.email,
            vehicle:captain.vehicle
        }
    })
}

module.exports = {
    registerCaptain,
    loginCaptain,
    getCaptainProfile
}