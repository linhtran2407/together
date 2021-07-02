const mongoose = require('mongoose')
const { Schema } = mongoose

const msgSchema = new Schema(
    {
        user: User,
        content: String,
    },
    {
        timestamps: true,        
    },
)

const Messages = mongoose.model('Messages', msgSchema)

module.exports = Messages