var log = require('./log');
var mq_client = require('../rpc/client');

exports.postbid=function(request,res)
{
    console.log("in post bid");
    var bidproductname=request.body.bidproductname;
    var bidprice=request.body.bidprice;
    var biddescription=request.body.biddescription;
    var bidshippingfrom=request.body.bidshippingfrom;
    var start=Date.now();
    var end=start+345600000;
    //var end=start+30000;
    var isBidEnded=0;
    var bidderid=null;

    var msg_payload = { "bidproductname": bidproductname, "bidprice": bidprice, "biddescription": biddescription,"bidshippingfrom": bidshippingfrom,"bidsellerid": request.session.userid,"start": start,"end": end,"isBidEnded": isBidEnded,"bidderid": bidderid};

    mq_client.make_request('bid_queue', msg_payload, function(err, results){
        if(err){
            console.log(err);
            //throw err;
        }
        else
        {
            if(results.code == 200){
                console.log("bid posted");
                log.log('info', request.session.username + " | Bid posted | " + new Date().toString());            }
            else if (results.code == 0){

                console.log("Unsuccessful bid post");
            }
        }
    })

    res.render("mybids.ejs");

}

exports.displaybid=function(request,res)

{

    var bidsellerid = request.session.userid;


    var msg_payload = { "bidsellerid":bidsellerid};
    mq_client.make_request('displaybid_queue',msg_payload, function(err,results){

        console.log(results);

        if(err){
            console.log("Error");

        }
        else
        {
            if(results.code == 200){
                log.log('info', request.session.username + " | Display My Bid | " + new Date().toString());

                res.send(results.data);

            }
            else if (results.code == 400){

                console.log("Not found");

            }
            else if (results.code == 0){

                console.log("DB Operation Failed");

            }
        }
    });
}

exports.displayallbid=function(request,res)

{

    var bidsellerid = request.session.userid;


    var msg_payload = { "bidsellerid":bidsellerid};
    mq_client.make_request('displayallbid_queue',msg_payload, function(err,results){

        console.log(results);

        if(err){
            console.log("Error");

        }
        else
        {
            if(results.code == 200){
                log.log('info', request.session.username + " | Display All Bids | " + new Date().toString());
                request.session.bidproductid=results.data[0]._id;
                res.send(results.data);

            }
            else if (results.code == 400){

                console.log("Not found");

            }
            else if (results.code == 0){

                console.log("DB Operation Failed");

            }
        }
    });
}



exports.bidding=function(request,res)
{
    var bidprice=request.body.bidprice;

    var conditions ={_id:request.session.bidproductid};
    var update = {
        'bidprice': bidprice,
        'bidderid': request.session.userid
    };

try{
    var msg_payload = { "conditions": conditions, "update": update};

    mq_client.make_request('bidding_queue', msg_payload, function(err, results){
        if(err){
            console.log(err);
            //throw err;
        }
        else
        {
            if(results.code == 200){
                log.log('info', request.session.username + " | Bid price updated | " + new Date().toString());

                console.log("Bid price updated");


                res.render("allbids")}
            else if (results.code == 0){

                console.log("Unsuccessful update of bid price");
            }
        }
    })}catch(RangeException){

    console.log("Exception")
}
    biddinghistory();

}
function biddinghistory(){

    console.log("In bidding history");
    var userid=request.session.userid;
    var productid=request.session.bidproductid;
    var productname=request.session.bidproductname;
    var time=Date.now();
    var price=request.session.bidprice;
    var isBidEnded=0;


    var msg_payload = { "userid": userid, "productid": productid, "productname": productname,"time": time,"price": price,"isBidEnded": isBidEnded};

    mq_client.make_request('biddinghistory_queue', msg_payload, function(err, results){
        if(err){
            console.log(err);
            //throw err;
        }
        else
        {
            if(results.code == 200){
                console.log("biddinghistory updated");
                log.log('info', request.session.username + " | Bidding history updated | " + new Date().toString());            }
            else if (results.code == 0){

                console.log("Unsuccessful bidding history update");
            }
        }
    })



}