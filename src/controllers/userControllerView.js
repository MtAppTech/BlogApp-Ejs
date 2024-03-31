"use strict";
/* ---------------------------------------- */
//    USER MODEL
/* ---------------------------------------- */

const { User } = require("../models/userModel");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports.User = {
  // Login/Logout Processes:

  login: async (req, res) => {
    if (req.method == "POST") {
      const { email, password } = req.body;

      if (email && password) {
        const user = await User.findOne({ email: email });

        if (user && passwordEncrypt(password) == user.password) {
          // email & password: true

          // Set Session:
          // req.session = {
          //     email: user.email,
          //     password: user.password
          // }
          // req.session.email = user.email
          // req.session.password = user.password

          req.session = {
            user: {
              email: user.email,
              password: user.password,
              id: user._id,
            },
          };

          // Remind Me:
          // Set Cookie:
          if (req.body.remindMe) {
            req.session.remindMe = true;
            // set MaxAge for user/login:
            req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3; // 3 days
          }

        //   res.status(200).send({
        //     error: false,
        //     message: "Logined.",
        //     session: req.session,
        //   });
        res.redirect('/')
        } else {
          // email & password: false
          res.errorStatusCode = 401;
          throw new Error("Login parameters are not true.");
        }
      } else {
        // res.status(401).send({
        //     error: true,
        //     message: 'Email and password are required.'
        // })

        // Send to errorHandler:
        res.errorStatusCode = 401;
        throw new Error("Email and password are required.");
      }
    }else {
        res.render('loginForm',{
            user:req.session?.user
        })
    }
  },

  logout: async (req, res) => {
    // Session destroy:
    req.session = null;

    // res.status(200).send({
    //   error: false,
    //   message: "Logout OK.",
    //   session: req.session,
    // });
    res.redirect('/')
  },
};
