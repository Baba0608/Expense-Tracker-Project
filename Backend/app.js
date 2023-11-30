const express = require("express");
const cors = require("cors");

const sequelize = require("./utils/database");
const signupRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");

const User = require("./models/users");
const Expense = require("./models/expenses");
const Order = require("./models/orders");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user/signup", signupRoutes);
app.use("/user/login", loginRoutes);
app.use("/expense", expenseRoutes);
app.use("/purchase", purchaseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
  // .sync()
  .sync({ force: true })
  .then(() => {
    console.log("Connected to Database");
    app.listen(4000);
  })
  .catch((err) => console.log(err));

// app.listen(4000);
