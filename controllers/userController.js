const User = require("../models/user");

exports.createUser = async (req, res, next) => {
  try {
    const { email, name, password, type } = req.body;

    if (!email || !name || !password) {
      throw new Error("email, name and password are required");
    }

    const user = await User.create({
      email: email,
      name: name,
      password: password,
      type: type || "user",
    });

    res.json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getMyProfile = async (req, res) => {
  res.json({
    status: "ok",
    data: req.user,
  });
};
