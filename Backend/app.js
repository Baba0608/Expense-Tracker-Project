const express = require("express");
const cors = require("cors");

const sequelize = require("./utils/database");
const signupRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const expenseRoutes = require("./routes/expense");

const User = require("./models/user");
const Expense = require("./models/expense");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user/signup", signupRoutes);
app.use("/user/login", loginRoutes);
app.use("/expense", expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
  .sync()
  .then(() => {
    console.log("Connected to Database");
    app.listen(4000);
  })
  .catch((err) => console.log(err));

// app.listen(4000);
