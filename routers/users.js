const express = require('express')

const router = express.Router()

// POST /api/users gets JSON bodies
router.post('/', function (req, res) {
    console.log(req.body)
    console.log(req.cookies)
    return res.json(req.body)
})

// GET /api/users gets JSON bodies
router.get('/', function (req, res) {
    res.send("Hello!")
})

router.get('/:id', function (req, res) {

    const id = req.params.id

    const users = [
        {
            id: '1',
            name: 'sho',
        },
        {
            id: '2',
            name: 'shovity',
        },
    ]

    const user = users.find(u => u.id  === id)

    console.log(user)

    return res.json(user)
})

module.exports = router