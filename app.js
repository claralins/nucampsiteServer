// var createError = require("http-errors");
// var express = require("express");
// var path = require("path");
// const session = require("express-session");
// const FileStore = require("session-file-store")(session);

// var logger = require("morgan");

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");

// var app = express();

// // week 2 exercise
// const campsiteRouter = require("./routes/campsiteRouter");
// const promotionRouter = require("./routes/promotionRouter");
// const partnerRouter = require("./routes/partnerRouter");

// const mongoose = require("mongoose");

// const url = "mongodb://localhost:27017/nucampsite";

// const connect = mongoose.connect(url, {
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// connect.then(
//   () => console.log("Connected correctly to server"),
//   (err) => console.log(err)
// );

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// // app.use(cookieParser("12345-67890-09876-54321"));

// app.use(
//   session({
//     name: session.id,
//     secret: "12345-67890-09876-54321",
//     saveUninitialized: false,
//     store: new FileStore(),
//   })
// );

// function auth(req, res, next) {
//   console.log(req.session);

//   if (!req.session.user) {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       const err = new Error("You are not authenticated");
//       res.setHeader("WWW-Authenticate", "Basic");
//       err.status = 401;
//       return next(err);
//     }

//     const auth = Buffer.from(authHeader.split(" ")[1], "base64")
//       .toString()
//       .split(":");
//     const user = auth[0];
//     const pass = auth[1];
//     if (user === "admin" && pass === "password") {
//       req.session.user = "admin";
//       return next(); //authorized, access granted;
//     } else {
//       const err = new Error("You are not authenticated");
//       res.setHeader("WWW-Authenticate", "Basic");
//       res.status = 401;
//       return next(err);
//     }
//   } else {
//     if (req.session.user === "admin") {
//       return next();
//     } else {
//       const err = new Error("You are not authenticated");
//       res.status = 401;
//       return next(err);
//     }
//   }
// }

// app.use(auth);

// app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// // week 2 xercise
// app.use("/campsites", campsiteRouter);
// app.use("/promotions", promotionRouter);
// app.use("/partners", partnerRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// module.exports = app;

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var campsiteRouter = require("./routes/campsiteRouter");
var promotionRouter = require("./routes/promotionRouter");
var partnerRouter = require("./routes/partnerRouter");
const e = require("express");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/campsites", campsiteRouter);
app.use("/promotions", promotionRouter);
app.use("/partners", partnerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

function auth(req, res, next) {
  console.log(req.session);

  if (!req.session.user) {
    const err = new Error("You are not authenticated");
    err.status = 401;
    return next(err);
  } else {
    if (req.session.user === "authenticated") {
      return next();
    } else {
      const err = new Error("You are not authenticated");
      res.status = 401;
      return next(err);
    }
  }
}

module.exports = app;
