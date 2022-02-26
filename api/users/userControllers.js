const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config

const exp = process.env.JWT_EXPIRATION_MS
const secret = process.env.JWT_SECRET

exports.signup = async (req, res, next) => {
    try {
        // destructoring password from req.body
        const { password } = req.body
        const saltRounds = 10
        // using password variable doesn't work
        req.body.password = await bcrypt.hash(password, saltRounds)
        const newUser = await User.create(req.body)
        const payload = {
            _id : newUser._id,
            username: newUser.username,
            exp: Date.now() + exp,
        };
        const token = jwt.sign(JSON.stringify(payload), secret)
        return res.status(201).json({ token })
    } catch (error) {
        next(error)
    }
};

exports.signin = async (req, res, next) => {
    try {
        console.log(req)
    } catch (error) {
        next(error)
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
      await req.user.remove();
      res.status(204).end();
    } catch (err) {
      next(error);
   }
};
  