var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require("./database.js");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// const bcrypt = require("bcrypt");
const cors = require('cors');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Replace '*' with your app's domain or whitelist specific domains
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    ); // Include the allowed HTTP methods
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, authtoken"
    ); // Include the allowed headers
    next();
});
const RoomRoute = require("./routes/room.js");
app.use("/api/room", RoomRoute);
const EmployeeRoute = require("./routes/employee.js");
app.use("/api/employee", EmployeeRoute);
const UserRoute = require("./routes/user.js");
app.use("/api/user", UserRoute);
const ManagerRoute = require("./routes/manager.js");
app.use("/api/manager", ManagerRoute);
const ReviewRoute = require("./routes/review.js");
app.use("/api/review", ReviewRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
