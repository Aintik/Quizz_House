const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const connectDB = require("./config/db.js");
const { config } = require("./config/env.js");
const { applyCors } = require("./config/cors.js");

const cors = require("cors");
require("dotenv").config();

const app = express();
applyCors(app);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Connect to DB
connectDB();

const testsRouter = require("./routes/tests");

const tokening = require("./middleware/auth.js");

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/admins", require("./routes/admins"));
// app.use("/tests", tokening, testsRouter);
app.use("/tests", testsRouter);

module.exports = app;
