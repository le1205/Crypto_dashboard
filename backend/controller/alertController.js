const Alert = require("../model/Alert");
const { resSuccess, resError } = require("../utils/responseMessage");

const createAlert = async (req, res) => {
  try {
    const alertData = {
      user_id: req.body.userId,
      cryptocurrency: req.body.cryptocurrency,
      targetPrice: req.body.targetPrice,
    };
    const alert = await Alert.create(alertData);
    resSuccess(res, { alert });
  } catch (err) {
    resError(res, err);
  }
};

const getUserAlerts = async (req, res) => {
  try {
    const userId = req.params.id;
    const alerts = await Alert.findAll({
      where: { user_id: userId, isDeleted: false },
    });
    resSuccess(res, { alerts });
  } catch (err) {
    resError(res, err);
  }
};

const deleteAlert = async (req, res) => {
  try {
    const alertId = req.params.id;
    await Alert.destroy({ where: { id: alertId } });
    resSuccess(res);
  } catch (err) {
    resError(res, err);
  }
};

module.exports = {
  createAlert,
  getUserAlerts,
  deleteAlert,
};
