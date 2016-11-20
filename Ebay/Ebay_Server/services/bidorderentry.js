var Order = require('../models/order');

function handle_request(msg, callback){

    console.log("In handle request of bidorderentry");

    var res = {};
    var productname=msg.productname;
    var quantity=msg.quantity;
    var price=msg.price;
    var total=msg.total;
    var date=msg.date;
    var userid=msg.userid;

    console.log("userid is "+ userid);


    var order = new Order();

    order.productname=productname;
    order.quantity=quantity;
    order.price=price;
    order.total=total;
    order.date=date;
    order.userid=userid;


    order.save(function(err,results){
        if (err){
            console.log(err);
            res.code = "0";
        }
        else if (results) {

            console.log(" successfull order entry");
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




