const express = require("express");
const router = express.Router();
const {registerUser} = require("../controllers/user.controller")
const {validateRegister} = require("../middleware/validation.middleware")

router.post('/register',validateRegister, registerUser);
// router.post('/login', loginUser);

module.exports = router;