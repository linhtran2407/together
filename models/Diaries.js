const mongoose = require('mongoose')
const {Schema} = mongoose

const diariesSchema = new Schema(
    {
        couple_id: String,
        user: {
            user_id: String,
            userName: String,
        },
        content: String,
    },
    {
        timestamps: true,
    },
)

const Diary = mongoose.model('Diary', diariesSchema)

module.exports = Diary