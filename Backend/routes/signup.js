const express = require("express");

const signupControllers = require("../controllers/signup");

const router = express.Router();

router.post("/", signupControllers.postSignupUserData);

module.exports = router;
