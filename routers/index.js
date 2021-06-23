const express = require('express')

const authentication = require('../middlewares/authentication')
const users = require('./users')
const signin = require('./signin')
const signup = require('./signup')
const diaries = require('./diaries')
const messages = require('./messages')
const couples = require('./couples')

const router = express.Router()

router.use('/signin', signin)
router.use('/signup', signup)

// authen
router.use(authentication)

router.use('/users', users)
router.use('/diaries', diaries)
router.use('/messages', messages)
router.use('/couples', couples)

module.exports = router