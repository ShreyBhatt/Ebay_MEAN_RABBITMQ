/**
 * Created by Shrey on 10/25/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongoURL = "mongodb://localhost:27017/Ebay";

//mongoose.connect(mongoURL);



// create a schema
var bidSchema = new Schema({

    bidproductname: {
        type: String,
        required: true
    },
    bidprice: {
        type: String,
        required: true
    },
    biddescription: {
        type: String,
        required: true
    },
    bidshippingfrom: {
        type: String,
        require: true
    },
    bidsellerid: {
        type: String,
        require: false,
        ref:'User'
    },
    bidderid: {
        type: String,
        require: false,
    },
    bidstarttime: {
        type: String,
        require: false
    },
    bidendtime: {
        type: String,
        require: false
    },
    isBidEnded: {
        type: Boolean,
        require: false
    }

});

var Bid = mongoose.model('Bid', bidSchema);

// make this available to our Node applications
module.exports = Bid;
