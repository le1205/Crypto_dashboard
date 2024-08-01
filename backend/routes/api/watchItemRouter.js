const express = require("express");
const router = express.Router();
const authToken = require("../../middleware/authToken");
const watchItemController = require("../../controller/watchItemController");

//  save and retrieve user watchlists
router.post("/save", [authToken], watchItemController.saveWatchItem);
router.get("/retrieve/:id", [authToken], watchItemController.getWatchItemList);

module.exports = router;
