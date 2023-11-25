const User = require("../models/user");
const { use } = require("../routes/signup");

const postSignupUserData = async (req, res, next) => {
  const { username, gmail, password } = req.body;

  const result = await User.create({
    username: username,
    gmail: gmail,
    password: password,
  });

  return res.status(200).json({ result });
};

exports.postSignupUserData = postSignupUserData;
