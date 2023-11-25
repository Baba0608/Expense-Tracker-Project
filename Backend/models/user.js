const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  gmail: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
