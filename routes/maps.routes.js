const express = require("express");
const router = express.Router();
const {getCoordinates} = require('../controllers/map.controller.js')



router.get('/get-coordinates',getCoordinates);


module.exports = router;