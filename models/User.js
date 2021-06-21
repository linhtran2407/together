const mongoose = require('mongoose')
const config = require('../config')
const jwt = require('jsonwebtoken')

const { Schema } = mongoose;

// define Schema
const usersSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        userName: String,
        passHash: String,
    },
    {
        timestamps: true,
    }
);

// Add methods
/// NOTE: methods must be added to the schema before compiling it with mongoose.model()
usersSchema.methods.speak = function () {
    const greeting = this.userName
      ? "Person's name is " + this.userName
      : "I don't have a name";
    console.log(greeting);
}

usersSchema.methods.getToken = async function () {
    return new Promise((resolve, reject) => {
        const data = { _id: this._id, firstName: this.firstName, lastName: this.lastName, userName: this.userName }
        jwt.sign(data, config.private_key, function(error, token) {
            if (error) {
                reject(error)
            } else {
                resolve(token)
            }
        });
    })
}

// create model: compile Schema into the model
const Users = mongoose.model('Users', usersSchema);

module.exports = Users