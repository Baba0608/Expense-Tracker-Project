const express = require("express");

const purchaseControllers = require("../controllers/purchase");
const userAuthenticate = require("../middleware/auth");

const router = express.Router();

router.get("/premium", userAuthenticate, purchaseControllers.purchasePremium);

router.post(
  "/updatetransactionstatus",
  userAuthenticate,
  purchaseControllers.updateTransactionStatus
);

module.exports = router;
