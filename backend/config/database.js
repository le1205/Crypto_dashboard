const Sequelize = require("sequelize");
const env = require("dotenv");
env.config();

const dbUrl = process.env.DATABASE_URL;

const sequelize = new Sequelize(dbUrl, {
  logging: false,
  // dialectOptions: {
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // },
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
