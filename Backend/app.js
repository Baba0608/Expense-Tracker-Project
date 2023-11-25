const express = require("express");
const cors = require("cors");

const sequelize = require("./utils/database");
const signupRoutes = require("./routes/signup");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", signupRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Connected to Database");
    app.listen(4000);
  })
  .catch((err) => console.log(err));

// app.listen(4000);
