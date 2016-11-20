
/**
 * Created by Shrey on 10/25/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongoURL = "mongodb://localhost:27017/Ebay";

//mongoose.connect(mongoURL);



// create a schema
var biddinghistorySchema = new Schema({

    userid: {
        type: String,
        required: true
    },
    productid: {
        type: String,
        required: true
    },

    productname: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    price: {
        type: String,
        require: true
    },
    isBidEnded: {
        type: Boolean,
        require: false
    }

});

var Biddinghistory = mongoose.model('Biddinghistory', biddinghistorySchema);

// make this available to our Node applications
module.exports = Biddinghistory;

