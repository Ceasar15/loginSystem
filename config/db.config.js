const mongoose = require('mongoose')
// declare a Database string URI
const DB_URI = 'mongodb://localhost:27017/urlShortner'

// establishing a database connection
mongoose.connect(DB_URI, {
    useNewUrlPArser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection

module.exports = connection;