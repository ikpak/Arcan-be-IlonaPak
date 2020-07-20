const User = require("../models/user");

exports.loginWithEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("email and password are required");
    }

    const user = await User.loginWithEmail(email, password);

    if (!user) {
      throw new Error("wrong email or password");
    }

    const token = await user.generateToken();

    res.json({
      status: "success",
      data: {
        user: user,
        token: token,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
