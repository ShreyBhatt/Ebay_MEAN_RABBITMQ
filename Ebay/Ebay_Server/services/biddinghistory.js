/**
 * Created by Shrey on 10/31/2016.
 */

var Biddinghistory = require('../models/biddinghistory');

function handle_request(msg, callback){

    console.log("In handle request of biddinghistory");

    var res = {};
    var userid = msg.userid;
    var productid = msg.productid;
    var productname = msg.productname;
    var time = msg.time;
    var price = msg.price;
    var isBidEnded = msg.isBidEnded;

    var biddinghistory = new Biddinghistory();


    biddinghistory.productname=productname;
    biddinghistory.productid=productid;
    biddinghistory.price=price;
    biddinghistory.time=time;
    biddinghistory.isBidEnded=isBidEnded;
    biddinghistory.userid=userid;


    biddinghistory.save(function(err,results){
        if (err){
            console.log("Error posting bid");
            res.code = "0";
        }
        else if (results) {

            console.log("Bid history update successfull");
            res.code = "200";
            res.data = results;
        }
        callback(null, res);

    });
}

exports.handle_request = handle_request;


