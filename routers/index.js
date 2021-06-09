const express = require('express')
const users = require('./users')
const signin = require('./signin')

const router = express.Router()

router.use('/users', users)
router.use('/signin', signin)

module.exports = router