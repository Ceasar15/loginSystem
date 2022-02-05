const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require("../models/user")


module.exports = function(passport){
    passport.use(
        new LocalStrategy({
            usernameField: 'email'}, (email, password, done) => {
                // ?? match the User
                User.findOne({
                    email: email
                })
                .then((user) => {
                    if (!user){
                        return done(null, false, {message : "User is not found with that email"})
                    }
                })

            }
        )
    )
}