const express = require("express");

const loginControllers = require("../controllers/login");

const router = express.Router();

router.post("/", loginControllers.checkLoginDetails);

module.exports = router;
