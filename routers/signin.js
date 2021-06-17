const express = require('express')
const Users = require('../models/User')
const md5 = require('md5')

const router = express.Router()

router.post('/', function (req, res) {
    const userName = req.body.userName
    const password = md5(req.body.password)

    Users.findOne( {userName}, (err, u) => {
        // check existence
        if (!u) {
            return res.status(400).json({err: 'User not found'})
        } else {
            // check password 
            if (password !== u.passHash) {
                return res.status(400).json({err: 'Password is not correct'})
            } else {
                // get token + create cookies
                u.getToken().then(function (token) {
                    res.cookie('token', token, { maxAge: 900000 })
                    return res.json()
                })
            }
        }

        
    })
})

module.exports = router