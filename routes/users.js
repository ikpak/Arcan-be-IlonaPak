var express = require("express");
var router = express.Router();

const { createUser } = require("../controllers/userController");
const { loginRequired } = require("../middleware/auth");

/* GET users listing. */
router
  .get("/", function (req, res, next) {
    res.send("respond with a resource");
  })
  .post("/", createUser);

module.exports = router;
