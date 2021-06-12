const express = require('express')
const users = require('./users')
const signin = require('./signin')
const signup = require('./signup')
const diaries = require('./diaries')
const messages = require('./messages')

const router = express.Router()

router.use('/users', users)
router.use('/signin', signin)
router.use('/signup', signup)
router.use('/diaries', diaries)
router.use('/messages', messages)

module.exports = router