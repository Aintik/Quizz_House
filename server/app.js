const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

mongoose.connect(process.env.MONGOroute).then((data) => {
  if (!data) console.error("error with mongoose connection");
  else console.log("Mongoose connected");
});

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const adminsRouter = require("./routes/admins");
const testsRouter = require("./routes/tests");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const tokening = require("./MiddleWare/signIn");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admins", adminsRouter);
// app.use("/tests", tokening, testsRouter);
app.use("/tests", testsRouter);

module.exports = app;
