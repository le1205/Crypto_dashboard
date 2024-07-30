const express = require("express");
const router = express.Router();
const authToken = require("../../middleware/authToken");
const transactionController = require("../../controller/transactionController");

//  save and retrieve transaction history
router.post("/saves", transactionController.saveTransaction);
router.get("/retrieve", transactionController.retrieveTransaction);

module.exports = router;
