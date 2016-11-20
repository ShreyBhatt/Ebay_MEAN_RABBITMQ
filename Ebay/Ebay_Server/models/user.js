var mongoose = require('mongoose');
var Schema = mongoose.Schema;





// create a schema
var userSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        require: true
    },
    contact: {
        type: String,
        require: true
    },
    lastlogin: {
        type: String,
        require: true
    }

});

var User = mongoose.model('User', userSchema);

// make this available to our Node applications
module.exports = User;