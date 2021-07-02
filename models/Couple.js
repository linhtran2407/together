
const mongoose = require('mongoose')
const { Schema } = mongoose

const coupleSchema = new Schema(
    {
        users: [{
            _id: String,
            userName: String,
        }],

        startDate: Date,
        endDate: Date,
    },
    {
        timestamps: true,
    },
)

const Couple = mongoose.model('Couple', coupleSchema)

module.exports = Couple