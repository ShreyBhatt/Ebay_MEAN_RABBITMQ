var Bid = require('../models/bid');


function handle_request(msg, callback){

    console.log("In handle request of LOGIN");

    var res = {};
    var conditions = msg.conditions;
    var update = msg.update;


    Bid.update(conditions,update,function (err, results) {
        if (err){
            console.log("Error fetching  Info");
            res.code = "0";
        }
        else if (results) {

            console.log("Update the isBidEnded");
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




