const { resMsg, resSuccess, resError } = require("../utils/responseMessage");
const Transaction = require("../model/Transaction");
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
    await Transaction.update(transactionData, {
      where: {
        user_id: userId,
      },
    });

    // Fetch the updated watchlist
    const updatedTransactionList = await Transaction.findAll({
      where: {
        user_id: userId,
      },
      attributes: [
        "id",
        "cryptoCurrency",
        "amount",
        "transactionStatus",
        "transactionDate",
      ],
    });

    req.app.get("broadcastUpdate")({
      type: "transaction_update",
      userId: userId,
      data: updatedTransactionList,
    });

    resSuccess(res);
  } catch (err) {
    resError(res, err);
  }
};

const getTransaction = async (req, res) => {
  try {
    const userId = req.params.id;
    const transaction = await Transaction.findOne({
      where: {
        user_id: userId,
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
    resError(res, err);
  }
};

module.exports = {
  saveTransaction,
  getTransaction,
};
