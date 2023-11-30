const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  orderid: {
    type: Sequelize.STRING,
  },
  paymentid: {
    type: Sequelize.STRING,
  },

  status: {
    type: Sequelize.STRING,
  },
});

module.exports = Order;
