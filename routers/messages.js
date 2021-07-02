const express = require('express')
const router = express.Router()
const Couple = require('../models/Couple')
const Message = require('../models/Message')

router.post('/', function (req, res) {
    return res.json(req.body)
})

router.get('/', function (req, res) {
    const user = req.user
    const limit = req.query.limit || 10
    const offset = req.query.offset || 0

    Couple.findOne({'users._id': user._id}, function(error, couple) {
        if (error || !couple){
            return res.status(400).json({error: "Couple not found"})
        }

        Message.find({'couple._id': couple._id}, function (error, msg) {
            if (error){
                return res.status(400).json({error: "Message not found"})
            }

            return res.json(msg)
        }).sort({ createdAt: -1}).limit(limit).skip(offset)
    })

})

module.exports = router