const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const connect = require("./config/db");
const ejs = require("ejs");
const layouts = require("express-ejs-layouts");
const path = require("path");

// express configuration
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);

// ejs configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(layouts);

// app routes
app.use("/api/files", require("./routes/file"));
app.use("/files", require("./routes/show"));
app.use("/files/download", require("./routes/download"));
app.use("/", require("./routes/app"));

app.listen(port, () => console.log(`Server is listening on port : ${port}`));
