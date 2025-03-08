const { body } = require("express-validator");

const validateRegister =   [
    body("email").isEmail().withMessage("Invalid email address.."),
    body("full_name.first_name")
    .notEmpty()
    .withMessage("First name is required"),
    body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least of 8 characters..."),
]

const validateLogin = [
    body("email").isEmail().withMessage("Invalid email address.."),
    body("password")
    .isLength({ min: 8 }).notEmpty()
    .withMessage("Password must be at least of 8 characters..."),
]

module.exports = {validateRegister,validateLogin};