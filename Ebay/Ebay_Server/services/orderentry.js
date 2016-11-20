
var Order = require('../models/order');

function handle_request(msg, callback){

    console.log("In handle request of OrderEntry");

    var res = {};
    var userid = msg.userid;
    var productname = msg.productname;
    var quantity = msg.quantity;
    var price = msg.price;
    var total = msg.total;
    var date = msg.date;

    var order=new Order();


    order.userid=userid;
    order.productname=productname;
    order.quantity=quantity;
    order.price=price;
    order.total=total;
    order.date=date;

    order.save(function(err,results){
        if (err){
            console.log("Error fetching  Info");
            res.code = "0";
        }
        else if (results) {

            console.log("order entry successfull");
            res.code = "200";
            res.data = results;

        }

        callback(null, res);

    });
}

exports.handle_request = handle_request;




