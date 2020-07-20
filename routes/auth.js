const express = require("express");
const router = express.Router();

const { loginWithEmail } = require("../controllers/authController");

const { loginRequired, logout } = require("../middleware/auth");

router.route("/login").post(loginWithEmail);

router.route("/logout").get(loginRequired, logout)

module.exports = router