var log = require('./log');
var mq_client = require('../rpc/client');

exports.productdetail=function(request,res)

{
    var productid=request.param("productid");
    console.log("hello in productdetail " + productid);
    var msg_payload = {"productid":productid};

    mq_client.make_request('productdetail_queue',msg_payload, function(err, results){
        if(err){
            console.log(err);
        }
        else
        {
            if(results.code == 200){
                console.log("Successful productdetails");
                console.log(results);
                request.session.productname = results.data[0].productname;
                request.session.price = results.data[0].price;
                request.session.quantity = results.data[0].quantity;

                log.log('info', request.session.username + " | Product Details | " + new Date().toString());

                console.log(results);
                res.render("productdetail.ejs",{result:results.data});            }
            else if (results.code == 0){

                console.log("Unsuccessful productdetails");
            }
        }
    })

}

exports.addcart = function(request, res){
    var price=request.session.price;
    var quantity=request.session.quantity;
    var total= quantity*price;
    console.log(total);



    var productid=request.session.productid;
    var productname=request.session.productname;
    var quantity=request.session.quantity;
    var price=request.session.price;
    var userid=request.session.userid;
    var total=total;


    try{
    var msg_payload = {"productid": productid,"productname": productname,"quantity": quantity,"price": price,"userid": userid,"total": total};

    mq_client.make_request('addcart_queue', msg_payload, function(err, results){
        if(err){
            console.log(err);
        }
        else
        {
            if(results.code == 200){

                console.log("product added to cart");
                log.log('info', request.session.username + " | Product Added to cart | " + new Date().toString());

                console.log(results);
                res.render("shopping-cart");           }
            else if (results.code == 0){

                console.log("Unsuccessful cart addition");
            }
        }
    })}catch (Exception){

        console.log("Exception");
    }
};