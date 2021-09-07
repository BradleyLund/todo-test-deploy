const express = require("express");
const path = require("path");
require("dotenv").config();

// bcrypt for password hashing
const bcrypt = require("bcryptjs");

const password = "mypass123";
const saltRounds = 10;

bcrypt.genSalt(saltRounds, function (saltError, salt) {
  if (saltError) {
    throw saltError;
  } else {
    bcrypt.hash(password, salt, function (hashError, hash) {
      if (hashError) {
        throw hashError;
      } else {
        console.log(hash);
      }
    });
  }
});

// needed to add this so that the frontend could make a request and see the response
var cors = require("cors");

const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

const app = express();

// using cors so that the response has the correct headers which allow the front end to read the response
app.use(cors());

app.use(express.json());

// Answer API requests.
app.get("/api", function (req, res) {
  // res.set("Content-Type", "application/json");
  console.log("api test");
  res.send('{"message":"Hello from the custom server!"}');
});

// we probably need to put this in the routes

// // here we would need to get the user from the database and see if the hashed password matches the one in the DB
// app.post("/login", (req, res) => {
//   const usr = req.body.username;
//   // this is the entered password
//   const pwd = req.body.password;

//   // get the hashed password from the Database by finding the document with that user name. maybe a controller function here
//   // for example something like the below
//   // const hash = getPasswordbyUsername(username)

//   res.send(`Username: ${usr}\n Password: ${pwd}`);
// });

// app.post("/newuser", (req, res) => {
//   const usr = req.body.username;
//   const pwd = req.body.password;

//   console.log("hello");
//   // we would need to add the code to check if the username is already taken?
//   const userController = require("./controllers/car.controller.js");

//   console.log(userController.createANewUser(usr, pwd));

//   // userController.createANewUser(usr, pwd, function (result) {
//   //   res.send(result);
//   // });

//   // then add the user if not

//   // res.send(`Username: ${usr}\n Password: ${pwd}`);
// });

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

require("./routes/new.js")(app);
require("./routes/login.js")(app);
// require("./routes/home.js")(app);
// require("./routes/delete.js")(app);
// require("./routes/update.js")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("error");
});

// All remaining requests return the React app, so it can handle routing.
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../react-ui/build", "index.html"));
});

app.listen(PORT, function () {
  console.error(`Now listening on port ${PORT}`);
});

const uri = process.env.DB_URI;
console.log(uri);
mongoose.Promise = global.Promise;

// useMongoClient not working
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", function () {
  console.log("Connection to Mongo established.");
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});
mongoose.connection.once("open", function () {
  console.log("Successfully connected to the database");
});

module.exports = app;
