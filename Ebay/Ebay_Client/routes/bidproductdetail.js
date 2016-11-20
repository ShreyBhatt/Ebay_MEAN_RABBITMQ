var log = require('./log');
var mq_client = require('../rpc/client');

exports.bidproductdetail=function(request,res)

{
    var bidproductid=request.param("bidproductid");
    console.log("hello in bidproductdetail " + bidproductid);
    var msg_payload = { "bidproductid": bidproductid};

    mq_client.make_request('bidproductdetail_queue', msg_payload, function(err, results){
        if(err){
            console.log(err);
        }
        else
        {
            if(results.code == 200){
                console.log("Successful bidproductdetails");
                console.log(results);
                request.session.bidproductname = results.data[0].bidproductname;
                request.session.bidprice = results.data[0].bidprice;

                log.log('info', request.session.username + " | Bid Product Details | " + new Date().toString());

                console.log(results);
                res.render("bidproductdetail.ejs",{result:results.data});            }
            else if (results.code == 0){

                console.log("Unsuccessful bidproductdetails");
            }
        }
    })

}
