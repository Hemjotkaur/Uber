const express = require("express");
const router = express.Router();
const {createRideController} = require('../controllers/ride.controller')

const { authUserMiddleware } = require("../middleware/auth.middleware");



router.post('/create-ride',authUserMiddleware, createRideController);

module.exports = router;