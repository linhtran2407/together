const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const exphbs = require('express-handlebars')

const connection = require('./connection')
const routers = require('./routers')
const Users = require('./models/User')
const authentication = require('./middlewares/authentication')

const PORT = 9000

const app = express()

// front end
// template view render html
const hbs = exphbs.create({
    extname: 'html',
    helpers: {
        stringify: (data) => {
            return JSON.stringify(data)
        }
    }
})

// view engine: handlebars
// read file once, cache info in RAM, response immediately when receive request from html
app.engine('html', hbs.engine)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')


app.use(express.json())
app.use(cookieParser())

app.get('/', express.static('public'))
app.use('/static', express.static('static'))
app.use('/api', routers)

app.get('/', authentication, (req, res, next) => {
    res.render('home')
})

app.get('/signup', (req, res, next) => {
    res.render('signup')
})

app.get('/signin', (req, res, next) => {
    res.render('signin')
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})