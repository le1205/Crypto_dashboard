const express = require("express");
const router = express.Router();
const authToken = require("../../middleware/authToken");
const alertController = require("../../controller/alertController");

router.post("/create", [authToken], alertController.createAlert);
router.get("/user/:id", [authToken], alertController.getUserAlerts);
router.delete("/:id", [authToken], alertController.deleteAlert);

module.exports = router;
