/**
 * Created by Shrey on 10/29/2016.
 */
var Cart = require('../models/cart');

function handle_request(msg, callback){

    console.log("In handle request of getcart");

    var res = {};

    var userid=msg.userid;
    console.log(userid);


    Cart.find({ userid:userid }, function(err, results) {
        if (err){
            console.log("Error fetching  Info");
            res.code = "0";
        }
        else if (results) {

            console.log("Cart Display successfull");
            res.code = "200";
            res.data = results;
            console.log(results);


        }

        callback(null, res);

    });
}

exports.handle_request = handle_request;

