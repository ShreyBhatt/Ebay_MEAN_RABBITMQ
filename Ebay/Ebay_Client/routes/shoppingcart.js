var log = require('./log');
var mq_client = require('../rpc/client');



exports.getcart = function(req, res){

    var userid=req.session.userid;

    var msg_payload = {"userid": userid};

    mq_client.make_request('getcart_queue', msg_payload, function(err, results){
        if(err){
            console.log(err);
        }
        else
        {
            if(results.code == 200){
                log.log('info', req.session.username + " | Shopping Cart Display | " + new Date().toString());

                console.log("In getcart node");
                console.log(results.data);
                req.session.cartid=results.data[0]._id;

                console.log(req.session.cartid);


                res.send(results.data);
            }
            else if (results.code == 0){

                console.log("Unsuccessful");
            }
        }
    })
}

exports.cart=function(req,res){
    log.log('info', req.session.username + " | Shopping Cart | " + new Date().toString());

    res.render("shopping-cart");
};

exports.remove = function(req, res){

    var cartid=req.session.cartid;
    console.log("cartid"+cartid);

    var msg_payload = {"cartid": cartid};

    mq_client.make_request('remove_queue', msg_payload, function(err, results){
        if(err){
            console.log(err);
        }
        else
        {
            if(results.code == 200){
                log.log('info', req.session.username + " | Item Removed from cart | " + new Date().toString());

                console.log("In remove cart node");
                console.log(results);
                res.render("shopping-cart");
            }
            else if (results.code == 0){

                console.log("Unsuccessful");
            }
        }
    })

};

