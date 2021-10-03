const Teacher = require("../models/teacher.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// function to verify the token and send back the userObject
function isAuthenticated(req, res) {
  let authHeader = req.headers["authorization"];
  let token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (err) {
    res.status(401).send("badtoken");
  }
}

module.exports = {
  createANewTeacher: function (req, res) {
    // can use a findone method here and if the username is found then respond with no you cannot create a new username with this username
    Teacher.findOne({ username: req.body.username }).exec(function (
      error,
      teacher
    ) {
      if (error) {
        //   error with the mongoose findone function
        res.send("error with the mongoose findone function");
      } else if (!teacher) {
        //   no username with that name found

        let teacherModel = new Teacher({
          username: req.body.username,
          password: req.body.password,
          studentsArray: [],
        });

        teacherModel.save(function (error, teacher) {
          if (error) {
            res.send("error saving the teacher");
          } else {
            // Make the JWT Token that will be sent to the client side
            res.status(200).send({
              username: teacher.username,
              token: teacher.getSignedJwtToken(),
            });
          }
        });
      } else {
        // username found and need to respond with that username already exists
        res.status(401).send("that username already exists, try another one");
      }
    });
  },

  authorizeTeacher: function (req, res) {
    let userObject = isAuthenticated(req, res);

    res.send(userObject);
  },

  loginTeacher: function (req, res) {
    Teacher.findOne({ username: req.body.username }).exec(function (
      error,
      teacher
    ) {
      if (error) {
        //   error with the mongoose findone function
        res.status(401).send("error with the mongoose findone function");
      } else if (!teacher) {
        //   no username with that name found
        res.status(401).send("no username with that name found");
      } else {
        //   found the username and now comparing
        teacher.comparePassword(
          req.body.password,
          function (matchError, isMatch) {
            if (matchError) {
              //   error with the compare function
              res.status(401).send("error with the compare function");
            } else if (!isMatch) {
              //   the password did not match, please re enter your password
              res
                .status(401)
                .send(
                  "the password did not match, please re enter your password"
                );
            } else {
              //   the password did match welcom you are logged in
              // make the token and send back the user id
              res.status(200).send({
                username: teacher.username,
                token: teacher.getSignedJwtToken(),
                isTeacher: true,
              });
            }
          }
        );
      }
    });
  },
};
