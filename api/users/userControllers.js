const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config;

const exp = +process.env.JWT_EXPIRATION_MS;
const secret = process.env.JWT_SECRET;

exports.signup = async (req, res, next) => {
  try {
    // destructoring password from req.body
    const { password } = req.body;
    const saltRounds = 10;
    // using destructored password variable doesn't work
    req.body.password = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create(req.body);
    const payload = {
      _id: newUser._id,
      username: newUser.username,
      exp: Date.now() + exp,
    };
    const token = jwt.sign(JSON.stringify(payload), secret);
    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res, next) => {
  const user = req.user;
  const payload = {
    _id: user._id,
    username: user.username,
    exp: Date.now() + exp,
  };
  const token = jwt.sign(JSON.stringify(payload), secret);
  return res.status(201).json({ token });
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
