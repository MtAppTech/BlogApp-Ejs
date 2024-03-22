"use strict"
/* ---------------------------------------- */
//    USER MODEL
/* ---------------------------------------- */

const { User } = require('../models/userModel')
const passwordEncrypt = require('../helpers/passwordEncrypt')

module.exports.User = {

    // GET
    list: async (req, res) => {

        // const data = await User.find()
        const data = await res.getModelList(User)

        res.status(200).send({
            error: false,
            data
        })
    },

    // CRUD Processes:

    // POST
    create: async (req, res) => {

        const data = await User.create(req.body)

        res.status(201).send({
            error: false,
            body: req.body,
            data
        })

    },

    // /:userId -> GET
    read: async (req, res) => {

        const data = await User.findOne({ _id: req.params.userId })

        res.status(200).send({
            error: false,
            data
        })
    },

    // /:userId -> PUT / PATCH
    update: async (req, res) => {

        const data = await User.updateOne({ _id: req.params.userId }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            body: req.body,
            // data: data,
            data,
            newData: await User.findOne({ _id: req.params.userId })
        })

    },

    // /:userId -> DELETE
    delete: async (req, res) => {

        const data = await User.deleteOne({ _id: req.params.userId })

        res.status((data.deletedCount >= 1) ? 204 : 404).send({
            error: false,
            data
        })
    },

    // Login/Logout Processes:

    login: async (req, res) => {

        const { email, password } = req.body

        if (email && password) {

            const user = await User.findOne({ email: email })

            if (user && passwordEncrypt(password) == user.password) {
            // email & password: true

                // Set Session:
                // req.session = {
                //     email: user.email,
                //     password: user.password
                // }
                req.session.email = user.email
                req.session.password = user.password

                // Remind Me:
                // Set Cookie:
                if (req.body.remindMe) {
                    req.session.remindMe = true
                    // set MaxAge for user/login:
                    req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3 // 3 days
                }

                res.status(200).send({
                    error: false,
                    message: "Logined.",
                    session: req.session
                })

            } else {
            // email & password: false
                res.errorStatusCode = 401
                throw new Error('Login parameters are not true.')
            }
        } else {

            // res.status(401).send({
            //     error: true,
            //     message: 'Email and password are required.'
            // })

            // Send to errorHandler:
            res.errorStatusCode = 401
            throw new Error('Email and password are required.')
        }
    },

    logout: async (req, res) => {

        // Session destroy:
        req.session = null

        res.status(200).send({
            error: false,
            message: "Logout OK.",
            session: req.session
        })
    }
}