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
/* -------------------------------------------------------------------------- */
/*                                  template                                  */
/* -------------------------------------------------------------------------- */
//https://github.com/mde/ejs/wiki/Using-EJS-with-Express

app.set('view engine', 'ejs');//! express de template engine olarak ejs i kullanacam diye ayar yapıyorum. Ayar yaparken set() metodu kullanılır.
//? Default olarak express klasör olarak views klasörünü arar. Ben istersem bunu da değiştirebilirim.
app.set('views','./public')//* views klasörü yerine public klasörünü kullan. Zorunlu bir işlem değil views olarak da kalabilir.

//* Gelen verilerin sadece string olarak ele alnıması istenirse, extended: false özelliği kullanılır, fakat eğer bir JSON nesnesi olarak ele alınması istenirse, extended: true parametresi ile kullanmak gerekir. API hizmeti de sunduğumuz için bizim için uygun olan seçenek {extended: true} olacaktır.
// app.use(express.urlencoded({extended:false}));
app.use(express.urlencoded({extended:true}));

// Static Files
app.use('/assets', express.static('./public/assets'));
//* /assets uzantısı görürsen bunun için public klasöründeki assetse erişim sağla.

/* ------------------------------------------------------- */
// Filtering, Searching, Sorting, Pagination

app.use(require('./src/middlewares/findSearchSortPage'))

/* ------------------------------------------------------- */
// JSON
app.use(express.json()) //konuma dikkat
// send async-errors to errorHandler:
require('express-async-errors')

/*
app.all('/', (req, res) => {
    // console.log(req.session)
    // res.send('WELCOME First ExpressJs Project with Mongo')
    res.send({
        message: 'WELCOME First ExpressJs Project with Mongo',
        session: req.session,
        login: req.session.email ? true : false
    })
})
*/

// routes
app.use('/api/user', require('./src/routes/userRouter'))
app.use('/api/blog', require('./src/routes/blogRouter'))
app.use('/',require('./src/routes/views'))


// ERROR HANDLER
app.use(require('./src/middlewares/errorHandler'))

// SYNCRONIZATION:
 //require('./src/sync')()

app.listen(PORT, () => console.log('running on http://127.0.0.1:' + PORT))