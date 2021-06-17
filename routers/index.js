const express = require('express')
const users = require('./users')
const signin = require('./signin')
const signup = require('./signup')
const diaries = require('./diaries')
const messages = require('./messages')

const router = express.Router()

router.use('/signin', signin)
router.use('/signup', signup)

// authen

router.use('/users', users)
router.use('/diaries', diaries)
router.use('/messages', messages)

module.exports = router