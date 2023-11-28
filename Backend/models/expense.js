const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Expense = sequelize.define("expense", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  item: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  amount: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});

module.exports = Expense;
