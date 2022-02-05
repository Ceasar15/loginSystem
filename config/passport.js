const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require("../models/user")


module.exports = function (passport) {
    passport.use(
        new LocalStrategy({
            usernameField: 'email'
        }, (email, password, done) => {
            // ?? match the User
            User.findOne({
                    email: email
                })
                .then((user) => {
                    if (!user) {
                        return done(null, false, {
                            message: "User is not found with that email"
                        });
                    }
                    //  match pass
                    bcrypt.compare(password, user.pasword, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, {
                                message: "Incorrect Password"
                            })
                        }
                    })
                })
                .catch((err) => {
                    console.log("error", err);
                })
        })
    )
    passport.serializeUser(function(user, done){
        done(null, user.id)
    });
    passport.deserializeUser(function(id, done){
        User.findOneById(id, function(err, user){
            done(err, user);
        });
    });
};