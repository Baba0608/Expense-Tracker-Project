const bcrypt = require("bcrypt");

const User = require("../models/user");

const checkLoginDetails = async (req, res, next) => {
  const { gmail, password } = req.body;

  try {
    const user = await User.findAll({
      where: {
        gmail: gmail,
      },
    });

    if (user.length > 0) {
      bcrypt.compare(password, user[0].dataValues.password, (err, result) => {
        if (err) {
          throw new Error("Something went wrong.");
        }

        if (result) {
          return res
            .status(200)
            .json({ success: true, message: "User logged in successfully." });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "Password is incorrect." });
        }
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist." });
    }
  } catch (err) {
    // console.log(err);
    return res.status(500).json({ success: false, message: err });
  }
};

exports.checkLoginDetails = checkLoginDetails;
