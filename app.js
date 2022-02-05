const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layouts');

const session = require('express-session');
const flash = require('connect-flash');


const passport = require('passport');
const LocalStrategy = require("./config/passport")(passport)


//mongoose connection
const connection = require('./config/db.config')
connection.once('open', () => {
    console.log("DB Connected")
})
connection.on('error', () => {
    console.log("DB Connection Error")
})



// EJS
app.set('view engine', 'ejs');
app.use(expressEjsLayout);

//Body Parser
app.use(express.urlencoded({
    extended: false
}));

// express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//use flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Routes 
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

app.listen(3000, function () {
    console.log("Server Started......")
})