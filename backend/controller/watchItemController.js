const User = require("../model/User");
const { resMsg, resSuccess, resError } = require("../utils/responseMessage");
require("dotenv").config();

const saveWatchItem = async (req, res) => {
  const userId = req.body.id;
  const watchListData = {
    symbol: req.body.watchlist,
  };
  try {
    await User.update(watchListData, {
      where: {
        id: userId,
      },
    });

    // Fetch the updated watchlist
    const updatedWatchList = await User.findOne({
      where: {
        id: userId,
        isDeleted: false,
      },
      attributes: ["symbol"],
    });

    // Broadcast the update to all connected clients
    req.app.get("broadcastUpdate")({
      type: "watchlist_update",
      userId: userId,
      data: updatedWatchList.symbol,
    });

    resSuccess(res);
  } catch (err) {
    resError(res, err);
  }
};

const getWatchItemList = async (req, res) => {
  try {
    const userId = req.params.id;
    const watchList = await User.findAll({
      where: {
        id: userId,
        isDeleted: false,
      },
      attributes: ["symbol"],
    });

    return resSuccess(res, watchList);
  } catch (err) {
    console.log(err);
    resError(res, err);
  }
};

module.exports = {
  saveWatchItem,
  getWatchItemList,
};
