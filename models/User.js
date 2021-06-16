const mongoose = require('mongoose');

const { Schema } = mongoose;

// define Schema
const usersSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    passHash: String,
    type: String,
});

// Add methods
/// NOTE: methods must be added to the schema before compiling it with mongoose.model()
usersSchema.methods.speak = function () {
    const greeting = this.userName
      ? "Person's name is " + this.userName
      : "I don't have a name";
    console.log(greeting);
}

// add method to find types
usersSchema.methods.findSimilarTypes = function(cb) {
    return mongoose.model('Users').find({ type: this.type }, cb);
};

// add static function: way 1
usersSchema.statics.findByName = function(userName, cb) {
    return this.find({ userName : new RegExp(userName, 'i') }, cb); // 'i' = ignoreCase
};

// way 2, equivalently: call `schema.static()`
// usersSchema.static('findByName', function(userName) { return this.find({ userName }); });

// create model: compile Schema into the model
const Users = mongoose.model('Users', usersSchema);

module.exports = Users