const express = require("express");
const router = express.Router();
const authToken = require("../../middleware/authToken");
const watchItemController = require("../../controller/watchItemController");

//  save and retrieve user watchlists
router.post("/save", watchItemController.saveWatchItem);
router.get("/retrieve", watchItemController.getWatchItemList);

module.exports = router;
