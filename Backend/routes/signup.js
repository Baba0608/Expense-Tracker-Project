const express = require("express");

const signupControllers = require("../controllers/signup");

const router = express.Router();

router.post("/signup", signupControllers.postSignupUserData);

module.exports = router;
