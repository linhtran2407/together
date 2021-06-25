const express = require('express')
const router = express.Router()
const Users = require('../models/User')

// GET /api/users gets JSON bodies
router.get('/', function (req, res) {
    const user = req.user

    Users.findOne({_id: user._id}, function (error, u) {
        if (error) {
            return res.status(400).json({error})
        } else {
            if (!u) {
                return res.status(400).json({error: 'User not found'})
            }
            return res.json(u)
        }
    });

})

// PUT /api/users 
router.put('/', function (req, res) {
    const user = req.user
    const newUserName = req.body.newUserName
    const newAvatar = req.body.newAvatar

    Users.findOne( {_id: user._id}, function (error, u) {
        if (error) {
            return res.status(400).json({error})
        } else {
            if(!u) {
                return res.status(400).json({error: 'User not found'})
            }
            
            if (newUserName) {
                u.userName = newUserName
            }

            if (newAvatar) {
                u.avatar = newAvatar
            }

            u.save() // notify db
            return res.json(u)
        }
    }) 

})

module.exports = router