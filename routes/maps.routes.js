const express = require("express");
const router = express.Router();
const {getCoordinates,getDistanceTime, getDistanceTimeController} = require('../controllers/map.controller.js')



router.get('/get-coordinates',getCoordinates);

router.get('/get-distance-time', getDistanceTimeController);

module.exports = router;