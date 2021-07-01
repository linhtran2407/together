const socketio = require('socket.io')

const io = socketio()

io.on('connection', (socket) => {
    console.log('a user connected')
    
    // query 10 latest message/history from DB

    // socket.emit('history', '')

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);


        // room - room id -> couple id

        // save to Message models

        io.emit('chat message', `${socket.user?.userName}: ${msg}`)
    })
    
    socket.on('login', (user) => {
        socket.user = user

        console.log(user)
    })


    // socket.on('disconnect', () => {
       
    // })
})





module.exports = io