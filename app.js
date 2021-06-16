const express = require('express')
const cookieParser = require('cookie-parser')

const connection = require('./connection')
const routers = require('./routers')
const Users = require('./models/User')

const app = express()

app.use(express.json())
app.use(cookieParser())

const port = 9000

app.get('/', express.static('public'))
app.use('/api', routers)
app.use('/static', express.static('static'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})