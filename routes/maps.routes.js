const express = require("express");
const router = express.Router();
const {getCoordinates,getDistanceTime, getDistanceTimeController,getSuggestionsController} = require('../controllers/map.controller.js')



router.get('/get-coordinates',getCoordinates);

router.get('/get-distance-time', getDistanceTimeController);

router.get('/get-suggestions', getSuggestionsController);

module.exports = router;