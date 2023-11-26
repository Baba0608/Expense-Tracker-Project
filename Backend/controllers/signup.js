const bcrypt = require("bcrypt");

const User = require("../models/user");

const postSignupUserData = async (req, res, next) => {
  const { username, gmail, password } = req.body;

  try {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "something went wrong." });
      } else {
        const result = await User.create({
          username: username,
          gmail: gmail,
          password: hash,
        });

        return res.status(200).json({ result });
      }
    });
  } catch (err) {
    // console.log(err);
    return res.status(500).json({ err });
  }
};

exports.postSignupUserData = postSignupUserData;
