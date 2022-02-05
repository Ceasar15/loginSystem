const express = require('express');
const router = express.Router()

router.get('/', function (req, res) {
    res.render('welcome');
})

router.get('/register', function (req, res){
    res.render('register');
})

module.exports = router;