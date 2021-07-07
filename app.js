const http = require('http')
const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const exphbs = require('express-handlebars')
const expressListEndpoints = require('express-list-endpoints')

const connection = require('./connection')
const routers = require('./routers')
const Users = require('./models/User')
const authentication = require('./middlewares/authentication')
const io = require('./io')

const app = express()
const server = http.createServer(app)

io.attach(server)

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


let holder = null

app.get('/gg', (req, res) => {
    holder = res
})

app.get('/cc', (req, res) => {
    res.end('')
    holder.end('ok')
})

console.log('eroc: :dna: list apis')
expressListEndpoints(app).forEach((api) => {
    api.methods.forEach((m) => console.log(`    ${m.padEnd(6)} ${api.path}`))
})

server.listen(9000, () => {
    console.log(`Together app listening at http://localhost:9000`)
})