/**
 * Created by Shrey on 10/25/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongoURL = "mongodb://localhost:27017/Ebay";

var productSchema = new Schema({

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
    description: {
        type: String,
        required: true
    },
    shippingfrom: {
        type: String,
        require: true
    },
    sellerid: {
        type: String,
        require: false,
        ref: 'User'
    }

});

var Product = mongoose.model('Product', productSchema);
module.exports = Product;
