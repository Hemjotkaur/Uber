const express = require("express");
const router = express.Router();
const {registerCaptain,loginCaptain,getCaptainProfile} = require("../controllers/captain.controller");
const { authCaptainMiddleware } = require("../middleware/auth.middleware");


router.post('/registerCaptain', registerCaptain);
router.post('/loginCaptain', loginCaptain);

router.get('/profile',authCaptainMiddleware,getCaptainProfile)

module.exports = router;