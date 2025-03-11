const Captain = require("../models/captain.model.js");

const createCaptain = async (captainData) => {
  try{
    const captain= await Captain.create(captainData);
    return captain;
} catch(error){
    throw new Error(error);
}
};

const loginCaptainByEmail = async (email) => {
  try {
    const captainData = await Captain.findOne({ email });
    return captainData;
  } catch (error) {
    return res.status(404).json({
      message: "Captain details Not Found..",
    });
  }
};

const getCaptainById = async(captainId) => {
  try{
    const captain = await Captain.findById(captainId);
    return captain;
  }catch(error){
    return res.status(404).json({
      message: "Captain details Not Found..",
    });

  }
}

module.exports = {
  createCaptain,
  loginCaptainByEmail,
  getCaptainById
};
