const LocalStrategy = require('passport-local')
const User = require("../models/User")
const bcrypt = require('bcrypt')
const { fetchProduct } = require('../api/products/productControllers')
const JwtStrategy = require('passport-jwt').Strategy
const { fromAuthHeaderAsBearerToken } = require('passport-jwt').ExtractJwt
require('dotenv').config

secret = process.env.JWT_SECRET

exports.localStrategy = new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username })
            const passwordMatch = user ? await bcrypt.compare(password, user.password):false;
                if(passwordMatch){done(null, user)}
                else{done(null, false)}
        } catch (error) {
            done(error)
        }
    }
)

exports.jwtStrategy = new JwtStrategy({
    jwtFromRequest: fromAuthHeaderAsBearerToken ,
    secretOrKey: secret,
    },
    async (jwtPayload, done) => {
        if(Date.now() > +jwtPayload.exp){
            return done(null, flase)
        }
        try {
            const user = await User.findById(jwtPayload._id)
            if(user){done(null, user)}
            done(null, false)
        } catch (error) {
            done(error)
        }
    } )

  