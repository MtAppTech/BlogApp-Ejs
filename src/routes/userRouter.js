"use strict"
/* ---------------------------------------- */
//    USER MODEL
/* ---------------------------------------- */

const router = require('express').Router()

const { User } = require('../controllers/userController')

// URL: /user

router.post('/login', User.login)
router.get('/logout', User.logout)

router.route('/')
    .get(User.list)
    .post(User.create)
router.route('/:userId')
    .get(User.read)
    .put(User.update)
    .patch(User.update)
    .delete(User.delete)

module.exports = router
