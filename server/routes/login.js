module.exports = function (app) {
  const car = require("../controllers/car.controller.js");
  app.post("/login", car.loginUser);
};
