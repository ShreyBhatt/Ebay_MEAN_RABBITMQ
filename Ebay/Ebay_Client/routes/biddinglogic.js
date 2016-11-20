var log = require('./log');
var moment = require('moment');
var bid = require('./biddinglog');
var mq_client = require('../rpc/client');

setInterval(function (request,res)
{
    console.log("setInterval called");
    var isBidEnded=0;
    var msg_payload = {"isBidEnded":isBidEnded};

    mq_client.make_request('biddinglogic_queue',msg_payload, function(err,results){
        if(err){
            console.log(err);
        }
        else
        {
            if(results.code == 200){
                console.log("hello ");

                for(var i=0;i<results.data.length;i++)
                {
                    if(Date.now()>results.data[i].bidendtime)

                    {
                        console.log(results.data[i]);
                        console.log("The Bid has been ended for the Product:"+results.data[i]._id);
                        closetheBid(results.data[i]._id);
                        addOrder(results.data[i]._id);

                    }
                    else
                    {

                        console.log("The Bid is still under progress for: "+results.data[i]._id);
                    }
                }
            }
            else if (results.code == 400){

                console.log("Unsuccessful");
            }
        }
    })

},10000);

function closetheBid(_id)
{
    var conditions ={_id:_id};
    var update = {
        'isBidEnded':1
    };


    var msg_payload = { "conditions": conditions,"update":update};

    mq_client.make_request('closethebid_queue', msg_payload, function(err, results){
        if(err){
            console.log(err);
        }
        else
        {
            if(results.code == 200){
                console.log("Update the isBidEnded");
            }
            else if (results.code == 0){

                console.log("Unsuccessful update of isBidEnded");
            }
        }
    })
}

function addOrder(_id)
{
    var msg_payload = {"_id":_id};

    mq_client.make_request('findmaxbidprice_queue', msg_payload, function(err, results){
        if(err){
            console.log(err);
        }
        else
        {
            if(results.code == 200){

                console.log(results.data[0]);

                if(results.data[0])
                {
                    var productname=results.data[0].bidproductname;
                    var quantity=1;
                    var price=results.data[0].bidprice;
                    var total=results.data[0].bidprice;
                    var date=Date.now();
                    var userid=results.data[0].bidderid;

                    console.log("Helllllllo" + productname + quantity + price + total);


                    var msg_payload = {"productname": productname,"quantity":quantity,"price":price,"total":total,"date":date,"userid":userid};

                    mq_client.make_request('bidorderentry_queue', msg_payload, function(err, results){
                        if(err){
                            console.log(err);
                        }
                        else
                        {
                            if(results.code == 200){
                                console.log("Entry in the order");
                            }
                            else if (results.code == 0){

                                console.log("Unsuccessful ");
                            }
                        }
                    })
                }
            }
            else if (results.code == 0){

                console.log("Unsuccessful entry in  order table");
            }
        }
    })

}

