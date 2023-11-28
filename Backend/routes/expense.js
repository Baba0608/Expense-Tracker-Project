const express = require("express");

const expenseControllers = require("../controllers/expense");
const userAuthenticate = require("../middleware/auth");

const router = express.Router();

router.post("/", userAuthenticate, expenseControllers.postExpense);
router.get("/", userAuthenticate, expenseControllers.getExpenses);

module.exports = router;
