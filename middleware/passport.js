const LocalStrategy = require('passport-local')
const User = require("../models/User")
const bcrypt = require('bcrypt')

exports.localStrategy = new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username })
            const passwordMatch = user ? await bcrypt.compare(password, user.password):false;
                if(passwordMatch) {done(null, user)}
                else{done(null, false)}
        } catch (error) {
            done(error)
        }
    }
)