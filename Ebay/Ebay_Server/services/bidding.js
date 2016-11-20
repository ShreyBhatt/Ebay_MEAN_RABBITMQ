/**
 * Created by Shrey on 10/31/2016.
 */
var Bid = require('../models/bid');

function handle_request(msg, callback){

    console.log("In handle request of Bidding");

    var res = {};
    var conditions = msg.conditions;
    var update = msg.update;

    Bid.update(conditions,update,function (err, results) {
        if (err){
            console.log("Error posting bid");
            res.code = "0";
        }
        else if (results) {

            console.log("Bid price update successfull");
            res.code = "200";
            res.data = results;
        }
        callback(null, res);

    });
}

exports.handle_request = handle_request;


