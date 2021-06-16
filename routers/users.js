const express = require('express')
const Users = require('../models/User')
const router = express.Router()

// POST /api/users gets JSON bodies
router.post('/', function (req, res) {
    console.log(req.body)
    console.log(req.cookies)
    return res.json(req.body)
})

// GET /api/users gets JSON bodies
router.get('/:_id', function (req, res) {
    const id = req.params._id    
    Users.findById(id, function (err, u) {
        if (err) {
            return res.status(400).json({err: 'User not found'})
        } else {
            return res.json(u)
        }
    });

})

// PUT /api/users gets JSON bodies
router.put('/:id', function (req, res) {

    const id = req.params.id

    const users = [
        {
            id: '1',
            name: 'sho213',
        },
        {
            id: '2',
            name: 'shovity123',
        },
    ]

    const user = users.find(u => u.id  === id)

    console.log(user)

    return res.json(user)
})

module.exports = router