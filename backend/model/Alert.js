const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/database");

const Alert = sequelize.define(
  "Alert",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: UUIDV4(),
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cryptocurrency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    targetPrice: {
      type: DataTypes.NUMBER,
      allowNull: false,
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

module.exports = Alert;
