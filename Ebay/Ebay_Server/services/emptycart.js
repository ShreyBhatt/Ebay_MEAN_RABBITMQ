/**
 * Created by Shrey on 10/29/2016.
 */

var Cart = require('../models/cart');

function handle_request(msg, callback){

    console.log("In handle request of empty cart");

    var res = {};
    var userid = msg.userid;
    console.log(userid);


    Cart.findOneAndRemove({ userid:userid }, function(err,results) {
            if (err){
                console.log("Error fetching  Info");
                console.log(error);

                res.code = "0";
            }
            else if (results) {

                console.log("Cart Empty successfull");
                res.code = "200";
                res.data = results;

            } else {
                console.log("Cart Empty not successfull");
                res.code = "400";
            }

            callback(null, res);

        });
}

exports.handle_request = handle_request;




