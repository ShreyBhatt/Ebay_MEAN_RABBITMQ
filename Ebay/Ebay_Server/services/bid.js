var Bid = require('../models/bid');

function handle_request(msg, callback){

    console.log("In handle request of Bid");

    var res = {};
    var bidproductname = msg.bidproductname;
    var bidprice = msg.bidprice;
    var biddescription = msg.biddescription;
    var bidsellerid = msg.bidsellerid;
    var bidshippingfrom = msg.bidshippingfrom;
    var start = msg.start;
    var end = msg.end;
    var isBidEnded = msg.isBidEnded;
    var bidderid = msg.bidderid;


    var bid=new Bid();
    bid.bidproductname=bidproductname;
    bid.bidprice=bidprice;
    bid.biddescription=biddescription;
    bid.bidsellerid=bidsellerid;
    bid.bidshippingfrom=bidshippingfrom;
    bid.bidstarttime=start;
    bid.bidendtime=end;
    bid.isBidEnded=isBidEnded;
    bid.bidderid=bidderid;


    bid.save(function(err,results){
        if (err){
            console.log("Error posting bid");
            res.code = "0";
        }
        else if (results) {

            console.log("Bid posted successfull");
            res.code = "200";
            res.data = results;

        }

        callback(null, res);

    });
}

exports.handle_request = handle_request;


