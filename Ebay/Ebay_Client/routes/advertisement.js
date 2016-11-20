var log = require('./log');
var mq_client = require('../rpc/client');

exports.postadvertise=function(request,res)
{
    console.log("in post advertise");
    var productname=request.body.productname;
    var quantity=request.body.quantity;
    var price=request.body.price;
    var description=request.body.description;
    var shippingfrom=request.body.shippingfrom;

    var msg_payload = { "productname": productname, "quantity": quantity, "price": price, "description": description,"shippingfrom": shippingfrom,"sellerid": request.session.userid};

    mq_client.make_request('advertisement_queue', msg_payload, function(err, results){
        if(err){
            console.log(err);
            //throw err;
        }
        else
        {
            if(results.code == 200){
                console.log("advertisement posted");
                log.log('info', request.session.username + " | Advertisement posted | " + new Date().toString());            }
            else if (results.code == 0){

                console.log("Unsuccessful advertisement post");
            }
        }
    })

res.render("myadvertisement.ejs");

}

exports.displayadvertise=function(request,res)
{
    var sellerid = request.session.userid;


    var msg_payload = { "sellerid":sellerid};
    mq_client.make_request('displayadvertise_queue',msg_payload, function(err,results){

        console.log(results);

        if(err){
            console.log("Error");

        }
        else
        {
            if(results.code == 200){
                log.log('info', request.session.username + " | Display My Advertise | " + new Date().toString());

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

exports.displayalladvertise=function(request,res)

{

    var sellerid = request.session.userid;


    var msg_payload = { "sellerid":sellerid};
    mq_client.make_request('displayalladvertise_queue',msg_payload, function(err,results){

        console.log(results);

        if(err){
            console.log("Error");

        }
        else
        {
            if(results.code == 200){
                log.log('info', request.session.username + " | Display All Advertise | " + new Date().toString());
                //request.session.productid=results.data[0]._id;
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