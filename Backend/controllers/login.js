const User = require("../models/user");

const checkLoginDetails = async (req, res, next) => {
  const { gmail, password } = req.body;

  try {
    const checkGmail = await User.findAll({
      where: {
        gmail: gmail,
      },
    });

    const result = checkGmail[0].dataValues;
    // console.log(result);
    return res.status(200).json({ result });
  } catch (err) {
    // console.log(err);
    return res.status(404).json({ err });
  }
};

exports.checkLoginDetails = checkLoginDetails;
