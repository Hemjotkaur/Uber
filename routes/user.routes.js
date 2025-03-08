const express = require("express");
const router = express.Router();
const {registerUser,loginUser,getProfile} = require("../controllers/user.controller")
const {validateRegister, validateLogin} = require("../middleware/validation.middleware")

router.post('/register',validateRegister, registerUser);
router.post('/login',validateLogin, loginUser);

router.get('/profile',getProfile);

module.exports = router;