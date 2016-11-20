/**
 * Created by Shrey on 10/28/2016.
 */
var Order = require('../models/order');

function handle_request(msg, callback){

    console.log("In handle request of Display my orders");
    var res = {};
    var userid = msg.userid;


    Order.find({ userid: userid }, function(err, results) {
        if (err){
            console.log("Error fetching  Info");
            res.code = "0";
        }
        else if (results) {

            console.log("My Orders display successfull");
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




