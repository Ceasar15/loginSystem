const {
    render
} = require('ejs')
const express = require('express')
const router = express.Router()
const User = require("../models/users")
const bcrypt = require("bcrypt")


// login handle
router.get('/login', (req, res) => {
    res.render('login')
})

router.get('register', (req, res) => {
    res.render('register')
})

// register handle
router.post('/register', (req, res) => {

    const {
        name,
        email,
        password,
        password2
    } = req.body;
    let errors = [];
    console.log('Name: ' + name + ' email: ' + email + ' password: ' + password)
    if (!name || !email || !password || !password2) {
        errors.push({
            msg: "Please fill in all the fields"
        })
    }

    if (password !== password2) {
        errors.push({
            msg: "Passwords Do Not Match"
        })
    }
    if (password.length < 6) {
        errors.push({
            msg: "Password must be at least 6 characters"
        })
    }
    if (errors.length > 0) {
        res.render('register', {
            errors: errors,
            name: name,
            email: email,
            password: password,
            password2: password2
        })
    } else {
        User.findOne({
            email: email
        }).exec((err, user) => {
            console.log(user);
            if (user) {
                errors.push({
                    msg: "Email already registered",
                });
                render(res, errors, name, email, password, password2);
            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password
                });

                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then((value) => {
                            console.log(value)
                            res.redirect('users/login');
                        })
                        .catch(value => console.log(value));
                }))
            }
        })
    }
})

router.post('/login', (req, res) => {

})

// logout
router.get('/logout', (req, res) => {

})

module.exports = router;