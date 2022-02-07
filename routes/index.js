const express = require('express');
const router = express.Router()
const { ensureAuthenticated } = require("../config/auth");


router.get('/', function (req, res) {
    res.render('welcome');
})

router.get('/register', function (req, res) {
    res.render('register');
})

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    // user: req.user
    res.render('dashboard',{
        user: req.user
    });
    // res.render('dashboard', user);
})




module.exports = router;