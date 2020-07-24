var express = require("express");
var router = express.Router();

const { createUser, getMyProfile } = require("../controllers/userController");
const { loginRequired } = require("../middleware/auth");

/* GET users listing. */
router
  .get("/", function (req, res, next) {
    res.send("respond with a resource");
  })
  .post("/", createUser);

router.route("/admin").get(loginRequired, getMyProfile)

module.exports = router;
