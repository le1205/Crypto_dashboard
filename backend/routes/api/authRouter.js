const express = require("express");
const router = express.Router();
const authController = require("../../controller/authController");

// sign in/sign up
router.post("/signin", authController.signIn);
router.post("/signup", authController.signUp);

module.exports = router;
