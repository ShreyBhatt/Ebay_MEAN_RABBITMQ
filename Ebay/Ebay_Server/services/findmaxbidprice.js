var Bid = require('../models/bid');

function handle_request(msg, callback){

    console.log("In handle request of findmaxbidprice");

    var res = {};
    var _id = msg._id;

    Bid.find({ _id:_id }).sort('-bidprice').exec(function (err,results){
        if (err){
            console.log("Error fetching  Info");
            res.code = "0";
        }
        else if (results) {

            console.log(" successfull find max bid price");
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




