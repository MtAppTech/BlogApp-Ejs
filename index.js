"use strict"
/*

BLOG api project

cp .env-sample .env
npm install
npm install ejs

*/

const express = require("express")
const app = express()

require('dotenv').config()
const PORT = process.env.PORT
//DB Connection
require('./src/configs/dbConnection')
/* ------------------------------------------------------- */
// SessionCookies:
// http://expressjs.com/en/resources/middleware/cookie-session.html
// https://www.npmjs.com/package/cookie-session
//* $ npm i cookie-session

const session = require('cookie-session')

app.use(session({
    secret: process.env.SECRET_KEY || 'write_random_chars_in_here',
    // name: 'cookie' // default: req.session
    // maxAge: 1000 * 60 * 60 * 24 // miliseconds
}))
/* ------------------------------------------------------- */
// Filtering, Searching, Sorting, Pagination

app.use(require('./src/middlewares/findSearchSortPage'))

/* ------------------------------------------------------- */
// JSON
app.use(express.json()) //konuma dikkat
// send async-errors to errorHandler:
require('express-async-errors')

app.all('/', (req, res) => {
    // console.log(req.session)
    // res.send('WELCOME First ExpressJs Project with Mongo')
    res.send({
        message: 'WELCOME First ExpressJs Project with Mongo',
        session: req.session,
        login: req.session.email ? true : false
    })
})

// ERROR HANDLER
app.use(require('./src/middlewares/errorHandler'))
app.listen(PORT, () => console.log('running on http://127.0.0.1:' + PORT))