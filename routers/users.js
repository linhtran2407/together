const express = require('express')
const router = express.Router()
const Users = require('../models/User')

// POST /api/users gets JSON bodies    ??????????
router.post('/', function (req, res) {
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