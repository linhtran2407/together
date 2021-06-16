const express = require('express')
const router = express.Router()
const Users = require('../models/User')

const md5 = require('md5');

router.post('/', (req ,res, next) => {
    // fetch data
    const userName = req.body.userName
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    Users.findOne({userName}, function (err, user) {
        // check existence
        if (user) { 
            return res.status(400).json({err: 'Username existed! Choose another username.'})
        }

        // check validation
        if (password !== confirmPassword) {
            return res.status(400).json({err: 'Passwords do not match!'})
        }

        // create user
        const validUser = new Users({userName: userName, passHash: md5(password)})
        
        // save user
        validUser.save(function (err, validUser) {
            if (err) {
                return console.error(err);
            }
            
            validUser.speak(); // log person's name

            return res.json(validUser)
        });

    });

})

module.exports = router