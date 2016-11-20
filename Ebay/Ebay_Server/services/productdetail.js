/**
 * Created by Shrey on 10/29/2016.
 */

var Product = require('../models/product');

function handle_request(msg, callback){

    console.log("In handle request of productdetail");

    var res = {};
    var productid = msg.productid;
    console.log(productid);


    Product.find({_id:productid})
        .populate('sellerid')
        .exec(function(error, results) {
        if (error){
            console.log("Error fetching product detail Info");
            console.log(error);

            res.code = "0";
        }
        else if (results) {

            console.log("Product detail fetching successfull");
            res.code = "200";
            res.data = results;

        } else {
            console.log("Product detail fetching not successfull");
            res.code = "400";
        }

        callback(null, res);

    });
}

exports.handle_request = handle_request;




