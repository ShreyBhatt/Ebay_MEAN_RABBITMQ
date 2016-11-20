/**
 * Created by Shrey on 10/26/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongoURL = "mongodb://localhost:27017/Ebay";

//mongoose.connect(mongoURL);



// create a schema
var orderSchema = new Schema({

    productname: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },

    quantity: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    total: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: false
    }

});

var Order = mongoose.model('Order', orderSchema);

// make this available to our Node applications
module.exports = Order;

