const { resMsg, resSuccess, resError } = require("../utils/responseMessage");
const User = require("../model/User");
require("dotenv").config();

const saveTransaction = async (req, res) => {
  const userId = req.body.id;
  const transactionData = {
    cryptoCurrency: req.body.orderData.cryptoCurrency,
    amount: req.body.orderData.amount,
    transactionStatus: req.body.orderData.transactionStatus,
    transactionDate: req.body.orderData.transactionDate,
  };
  try {
    const user = await User.findByPk(userId);
    await user.update(transactionData);
    resSuccess(res);
  } catch (err) {
    resError(res, err);
  }
};

const getTransaction = async (req, res) => {
  try {
    const userId = req.params.id;
    const transaction = await User.findOne({
      where: {
        id: userId,
        isDeleted: false,
      },
      attributes: [
        "id",
        "cryptoCurrency",
        "amount",
        "transactionStatus",
        "transactionDate",
      ],
    });
    resSuccess(res, transaction);
  } catch (err) {
    console.log(err);
    resError(res, err);
  }
};

module.exports = {
  saveTransaction,
  getTransaction,
};
