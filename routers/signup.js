const express = require('express')
const router = express.Router()
const Users = require('../models/User')

const md5 = require('md5');

router.post('/', (req ,res, next) => {
    // fetch data
    const userName = req.body.userName
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    Users.findOne({userName}, function (error, user) {
        // check existence
        if (user) { 
            return res.status(400).json({error: 'Username existed! Choose another username.'})
        }

        // check validation
        if (password !== confirmPassword) {
            return res.status(400).json({error: 'Passwords do not match!'})
        }

        // create user
        const validUser = new Users({userName: userName, passHash: md5(password)})
        
        // save user
        validUser.save(function (error, validUser) {
            if (error) {
                return console.error(error);
            }
            
            validUser.speak(); // log person's name

            return res.json(validUser)
        });

    });

})

module.exports = router