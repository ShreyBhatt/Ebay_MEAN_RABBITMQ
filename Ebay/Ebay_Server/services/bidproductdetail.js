/**
 * Created by Shrey on 10/29/2016.
 */

var Bid = require('../models/bid');

function handle_request(msg, callback){

    console.log("In handle request of bidproductdetail");

    var res = {};
    var bidproductid = msg.bidproductid;

    Bid.find({_id:bidproductid})
        .populate('bidsellerid')
        .exec(function(error, results) {
            if (error){
                console.log("Error fetching bid product detail Info");
                res.code = "0";
            }
            else if (results) {

                console.log("Bid Product detail fetching successfull");
                res.code = "200";
                res.data = results;

            } else {
                console.log("Bid Product detail fetching not successfull");
                res.code = "400";
            }

            callback(null, res);

        });
}

exports.handle_request = handle_request;




