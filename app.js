const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();


connectDB();

app.get("/uber", async(req,res)=>{
    console.log("home");
})

module.exports = app;