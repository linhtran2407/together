const mongoose = require('mongoose')
const { Schema } = mongoose

const msgSchema = new Schema(
    {
        user: {
            _id: String,
            userName: String,
        },
        coupleID: String,
        content: String,
    },
    {
        timestamps: true,        
    },
)

const Message = mongoose.model('Message', msgSchema)

module.exports = Message