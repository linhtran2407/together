const socketio = require('socket.io')

const io = socketio()

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.emit('hello', {})



    socket.on('disconnect', () => {
       
    })
})





module.exports = io