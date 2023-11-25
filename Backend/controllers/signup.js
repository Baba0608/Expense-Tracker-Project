const User = require("../models/user");

const postSignupUserData = async (req, res, next) => {
  const { username, gmail, password } = req.body;

  try {
    const result = await User.create({
      username: username,
      gmail: gmail,
      password: password,
    });

    return res.status(200).json({ result });
  } catch (err) {
    // console.log(err);
    return res.status(500).json({ err });
  }
};

exports.postSignupUserData = postSignupUserData;
