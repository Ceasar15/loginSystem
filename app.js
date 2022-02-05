const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layouts');

//mongoose connection

mongoose.connect('mongodb://localhost:27017/test', {
    userNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connected...")
}).catch((err) => {
    console.warn("DB NOT Connected...!!!")
})

// EJS
app.set('view engine', 'ejs');
app.use(expressEjsLayout);

//Body Parser
app.use(express.urlencoded({
    extended: false
}));

//Routes 
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

app.listen(3000 , function () {
    console.log("Server Started......")
})