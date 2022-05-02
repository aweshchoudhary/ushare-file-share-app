const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database Fail", err));

module.exports = mongoose;
