/**
 * Created by Shrey on 10/29/2016.
 */
var Cart = require('../models/cart');


var cart = new Cart();

function handle_request(msg, callback){

    console.log("In handle request of AddCart");

    var res = {};
    var productid=msg.productid;
    var productname=msg.productname;
    var quantity=msg.quantity;
    var price=msg.price;
    var userid=msg.userid;
    var total=msg.total;


    cart.productid=productid;
    cart.productname=productname;
    cart.quantity=quantity;
    cart.price=price;
    cart.userid=userid;
    cart.total=total;

    cart.save(function(err,results){
        if (err){
            console.log("Error fetching  Info");
            res.code = "0";
        }
        else if (results) {

            console.log("Cart Entry successfull");
            res.code = "200";
            res.data = results;

        }

        callback(null, res);

    });
}

exports.handle_request = handle_request;






