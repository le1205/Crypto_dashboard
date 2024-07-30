const { Op } = require("sequelize");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { resMsg, resSuccess, resError } = require("../utils/responseMessage");
const { resCode, resMessage } = require("../constants/resCode");
require("dotenv").config();

const signIn = async (req, res) => {
  const loginData = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const user = await User.findOne({
      where: {
        email: { [Op.iLike]: loginData.email },
        isDeleted: false,
      },
    });
    if (user) {
      const compareResult = await bcrypt.compare(
        loginData.password,
        user.password
      );
      if (compareResult) {
        const token = jwt.sign(
          {
            id: user.id,
          },
          process.env.SECRETKEY,
          {
            expiresIn: process.env.Expired,
          }
        );
        resSuccess(res, {
          accessToken: token,
          user,
        });
      } else {
        return resMsg(res, resCode.INVALID_USER, resMessage.INVALID_USER);
      }
    } else {
      return resMsg(res, resCode.NO_EXIST, resMessage.NO_EXIST);
    }
  } catch (err) {
    console.error(err);
    resError(res, err);
  }
};

const signUp = async (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const user = await User.findOne({
      where: {
        email: { [Op.iLike]: userData.email },
        isDeleted: false,
      },
    });
    if (user) {
      resMsg(res, resCode.ALREADY_EXIST, resMessage.ALREADY_EXIST);
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(userData.password, salt);

      userData.password = hash;
      await User.create(userData);
      resMsg(res, resCode.CREATED, resMessage.CREATED);
    }
  } catch (err) {
    resError(res, err);
  }
};

module.exports = {
  signIn,
  signUp,
};
