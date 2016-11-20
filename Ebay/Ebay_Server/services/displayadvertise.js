/**
 * Created by Shrey on 10/28/2016.
 */
var Product = require('../models/product');


function handle_request(msg, callback){

    console.log("In handle request of Display my advertisement");

    var res = {};
    var sellerid = msg.sellerid;


    Product.find({ sellerid:sellerid}, function(err, results) {
        if (err){
            console.log("Error fetching  Info");
            res.code = "0";
        }
        else if (results) {

            console.log("My Advertisement display successfull");
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




