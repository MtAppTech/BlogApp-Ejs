"use strict"
/*

MONGODB CONNECTION

*/

const mongoose = require("mongoose")
// const MONGODB='mongodb://127.0.0.1:27017/blogAPI' 

mongoose.connect(process.env.MONGODB)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB NOT Connected", err))