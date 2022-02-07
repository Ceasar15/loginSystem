const LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy
const bcrypt = require('bcrypt');
const User = require("../models/users")
const dotenv = require('dotenv');
dotenv.config();

GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({
            usernameField: 'email'
        }, (email, password, done) => {
            //match user
            User.findOne({
                    email: email
                })
                .then((user) => {
                    if (!user) {
                        return done(null, false, {
                            message: 'email not registered'
                        });
                    }
                    //math passwords
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, {
                                message: 'password incorrect'
                            });
                        }
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
    )

    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3001/auth/google/callback",
        passReqToCallback: true
    }, function (request, accessToken, refreshToken, user, done) {
        User.findOne({ googleId: user.id }).then((user) => {
            if (user){
                return done(null, user);
            }
            else{
                new User({googleId: user.id}).save().then((user) =>done(null, user))
            }
        })

        // console.log("lsldkjfsdkf", user.id)
        // console.log(user)
        // diss = user.displayName
        // return done(null, user);
    }))

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    })
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        })
    })
}