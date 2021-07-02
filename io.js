const socketio = require('socket.io')
const Message = require('./models/Message')
const Couple = require('./models/Couple')
const io = socketio()
  
io.on('connection', (socket) => {
    console.log('a user connected')
    
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        
        // query couple
        Couple.findOne({'users._id': socket.user?._id}, function(error, cp){

            // save to Message models
            const message = new Message({
                user: socket.user,
                coupleID: cp._id, 
                content: msg
            })
            message.save()
        })

        io.emit('chat message', `${socket.user?.userName}: ${msg}`)
    })
    
    socket.on('login', (user) => {
        socket.user = user
        console.log(user)

        Couple.findOne({'users._id': user._id}, function(error, couple){
            // join private room based on couple id
            socket.join(couple._id);

            // query msg history
            Message.find({'couple._id': couple._id}, function (error, msg) {    
                socket.emit('history', msg);

            }).sort({ createdAt: -1}).limit(240)
        })

    })


    // socket.on('disconnect', () => {
       
    // })
})





module.exports = io