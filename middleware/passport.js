const LocalStrategy = require('passport-local')
const User = require("../models/User")
const bcrypt = require('bcrypt')

exports.localStrategy = new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = User.username
        } catch (error) {
            done(error)
        }
    }
)