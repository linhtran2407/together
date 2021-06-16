const mongoose = require('mongoose');

const config = require('./config')

// include mongoose in the project and open a connection to the test database on our locally running instance of MongoDB.

mongoose.connect(config.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
        authSource: 'admin',
    },
});

const db = mongoose.connection;

// notify if connect successfully or not
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log("mongoose: we're connected!") 
});