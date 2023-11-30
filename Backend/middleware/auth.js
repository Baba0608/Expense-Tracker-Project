require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("../models/users");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("authorization");

    const userId = jwt.verify(token, process.env.SECRET_KEY);

    console.log(userId);

    const user = await User.findByPk(userId.userId);
    if (user) {
      req.user = user;
      next();
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false });
  }
};

module.exports = authenticate;
