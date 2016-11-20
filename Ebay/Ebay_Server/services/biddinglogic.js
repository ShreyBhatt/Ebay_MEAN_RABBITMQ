/**
 * Created by Shrey on 11/1/2016.
 */
var Bid = require('../models/bid');

function handle_request(msg, callback){

    console.log("In handle request of biddinglogic");

    var res = {};
    var isBidEnded=msg.isBidEnded;
    console.log(isBidEnded);


    Bid.find({isBidEnded:0}, function(err, results) {
        if (err){
            console.log("Error fetching  Info");
            res.code = "0";
        }
        else if (results) {
            console.log("results"+results);
            console.log("bidding logic successfull");
            res.code = "200";
            res.data = results;

        } else {
            console.log("data not found");
            res.code = "400";
        }

        callback(null, res);

    });
}

exports.handle_request = handle_request;




