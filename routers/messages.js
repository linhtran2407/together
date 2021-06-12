const express = require('express')

const router = express.Router()

router.post('/', function (req, res) {
    return res.json(req.body)
})

router.get('/:_id', function (req, res) {
    const _id = req.params._id

    const sample_messages = [
        {
            id: '1',
            msg: 'ndfjkasfn'
        },
        {
            id: '2',
            msg: '124352465'
        }
    ]

    const message = sample_messages.find(mess => mess.id === _id)

    return res.send(`Get msg: ${message.msg}`)
})

module.exports = router