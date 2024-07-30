const express = require("express");
const router = express.Router();
const authRouter = require("./api/authRouter");
const watchItemRouter = require("./api/watchItemRouter");
const transactionRouter = require("./api/transactionRouter");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.use("/auth", authRouter);
router.use("/watchlist", watchItemRouter);
router.use("/transaction", transactionRouter);

module.exports = router;
