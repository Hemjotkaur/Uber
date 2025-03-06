const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const userRoutes = require("./routes/user.routes");
const bodyparser = require("body-parser");



connectDB();


app.use(bodyparser.json());
app.use('/api/users', userRoutes)

module.exports = app;