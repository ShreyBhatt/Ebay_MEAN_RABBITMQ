var Product = require('../models/product');

function handle_request(msg, callback){

    console.log("In handle request of Advertisement");

    var res = {};
    var productname = msg.productname;
    var quantity = msg.quantity;
    var price = msg.price;
    var description = msg.description;
    var sellerid = msg.sellerid;
    var shippingfrom = msg.shippingfrom;

var product=new Product();
    product.productname=productname;
    product.quantity=quantity;
    product.price=price;
    product.description=description;
    product.sellerid=sellerid;
    product.shippingfrom=shippingfrom;

    product.save(function(err,results){
        if (err){
            console.log("Error posting advertisement");
            res.code = "0";
        }
        else if (results) {

            console.log("Advertisement posted successfull");
            res.code = "200";
            res.data = results;

        }

        callback(null, res);

    });
}

exports.handle_request = handle_request;


