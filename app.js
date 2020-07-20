var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors")

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const eventRouter = require("./routes/events");
const authRouter = require("./routes/auth")
const newsRouter = require("./routes/news")

require("dotenv").config()

var app = express();

mongoose
  .connect("mongodb://localhost/arcan")
  .then(() => console.log("connected to database"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors())

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter)
app.use("/events", eventRouter);
app.use("/news", newsRouter)

module.exports = app;
