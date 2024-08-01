const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: UUIDV4(),
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      require: true,
    },
    password: {
      type: DataTypes.STRING,
      require: false,
    },
    symbol: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      allowNull: true,
    },
    cryptoCurrency: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 8),
      defaultValue: 0,
      allowNull: false,
    },
    transactionStatus: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      require: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["id"],
      },
    ],
  }
);

module.exports = User;
