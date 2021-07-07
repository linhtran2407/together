const express = require('express')
const router = express.Router()

router.get('/', function(req, res){
    res.clearCookie('token')
    res.redirect('/signin')
})

module.exports = router