var log = require('./log');
var mq_client = require('../rpc/client');


function validate(request,res) {

    var cardRegex=new RegExp("^4[0-9]{12}(?:[0-9]{3})?$","g");
    var expDateRegex=new RegExp("^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$","g");
    var CVVRegex=new RegExp("^[0-9]{3,4}$","g");
    var inputCVV = request.param("inputCVV");
    var inputExpDate = request.param("inputExpDate");
    var inputCardNo = request.param("inputCardNo");

    try{
        if(CVVRegex.test(inputCVV) && cardRegex.test(inputCardNo) && expDateRegex.test(inputExpDate)){
        checkdata(request,res);
        log.log('info', request.session.username + " | CreditCard Validated | " + new Date().toString());

        res.render("paymentsuccess");}
    else{

        res.render('payment',{invalidcard:"Invalid information"});

    }}catch (Exception){

        console.log(Exception);
    }


}

function emptycart(request,res) {

var userid= request.session.userid;
    var msg_payload = {"userid": userid};

    mq_client.make_request('emptycart_queue', msg_payload, function(err, results){
        if(err){
            console.log(err);
        }
        else
        {
            if(results.code == 200){

                console.log("product removed from cart");
                log.log('info', request.session.username + " | Product removed from cart | " + new Date().toString());

                      }
            else if (results.code == 0){

                console.log("Unsuccessful cart empty operation");
            }
        }
    })
}

function checkdata(request,res) {

        console.log("Coming in checkdata");

        var price=request.session.price;
        var quantity=request.session.quantity;
        var total= quantity*price;
        console.log(total);
        console.log(Date());

     var productname=request.session.productname;
     var quantity=request.session.quantity;
     var price=request.session.price;
     var total=total;
     var date=Date.now();
     var userid=request.session.userid;


    var msg_payload = {"userid": userid,"productname": productname,"quantity": quantity,"price": price,"total": total,"date": date};

    mq_client.make_request('orderentry_queue', msg_payload, function(err, results){
        if(err){
            console.log(err);
        }
        else
        {
            if(results.code == 200){

                console.log("product inserted in orders");
                log.log('info', request.session.username + " | Product inserted in orders | " + new Date().toString());
                console.log(results);
                emptycart(request,res);
            }
            else if (results.code == 0){

                console.log("Unsuccessful order operation");
            }
        }
    })
};
exports.checkdata=checkdata;
exports.validate=validate;
exports.emptycart=emptycart;


