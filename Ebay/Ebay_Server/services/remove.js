/**
 * Created by Shrey on 10/29/2016.
 */
var Cart = require('../models/cart');

function handle_request(msg, callback){

    console.log("In handle request of reemove cart");

    var res = {};

    var cartid=msg.cartid;
    console.log(cartid);


    Cart.findOneAndRemove({_id:cartid }, function(err,results) {
        if (err){
            console.log("Error removing  cart items");
            res.code = "0";
        }
        else if (results) {

            console.log("Cart items remove successfull");
            res.code = "200";
            res.data = results;
            console.log(results);


        }

        callback(null, res);

    });
}

exports.handle_request = handle_request;

