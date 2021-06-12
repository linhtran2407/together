const express = require('express')
const cookieParser = require('cookie-parser')

const routers = require('./routers')

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





// self-written cookie parser (for fun)
// app.use((req, res, next) => {
//     // raw cookies 
//     const raw = req.headers.cookie
//     const cookies = {}
//     const rawSplit = raw.split("; ");
//     let i =0;
//     while (i<rawSplit.length){
//       const mySplit = rawSplit[i].split("=");
//       cookies[mySplit[0]] = mySplit[1];
//       i++;
//     }
//     req.cookies = cookies
//     console.log(req.cookies)
//     next();
// })