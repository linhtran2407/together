const express = require('express')
const Users = require('../models/User')
const router = express.Router()

// POST /api/users gets JSON bodies    ??????????
router.post('/', function (req, res) {
    console.log(req.body)
    console.log(req.cookies)
    return res.json(req.body)
})

// GET /api/users gets JSON bodies
router.get('/:_id', function (req, res) {
    const id = req.params._id    
    Users.findById(id, function (error, u) {
        if (error) {
            return res.status(400).json({error: 'User not found'})
        } else {
            return res.json(u)
        }
    });

})

// PUT /api/users gets JSON bodies
router.put('/:_id', function (req, res) {
    const id = req.params._id
    Users.findById(id, function (error, u) {
        if (error) {
            return res.status(400).json({error: 'User not found'})
        } else {
            return res.json(u)
        }
    }) 

})

module.exports = router