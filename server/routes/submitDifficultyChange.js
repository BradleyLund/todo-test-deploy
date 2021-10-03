module.exports = function (app) {
  const student = require("../controllers/student.controller.js");
  app.post("/changedifficulty", student.changeDifficulty);
};
