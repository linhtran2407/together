const express = require('express')

const router = express.Router()

router.post('/', function(req ,res) {
    return res.json(req.body)
})

module.exports = router