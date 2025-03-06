const { body } = require("express-validator");

const validateRegister =   [
    body("email").isEmail().withMessage("Invalid email address.."),
    body("fullname.firstname")
    .notEmpty()
    .withMessage("First name is required"),
    body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least of 8 characters..."),
]

module.exports = {validateRegister};