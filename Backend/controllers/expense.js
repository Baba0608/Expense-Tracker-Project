const Expense = require("../models/expense");

const postExpense = async (req, res, next) => {
  const { item, category, amount } = req.body;
  console.log(item, category, amount);
  try {
    const result = await req.user.createExpense({
      item: item,
      category: category,
      amount: amount,
    });

    return res
      .status(201)
      .json({ success: true, message: "Expense added successfully." });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Expense not added." });
  }
};

const getExpenses = async (req, res, next) => {
  try {
    const result = await Expense.findAll({ where: { userId: req.user.id } });

    return res
      .status(200)
      .json({ success: true, message: "Expenses are fetched.", result });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong." });
  }
};

exports.postExpense = postExpense;
exports.getExpenses = getExpenses;
