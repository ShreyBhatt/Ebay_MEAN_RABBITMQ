var ejs= require('ejs');
var log = require('./log');
var mq_client = require('../rpc/client');


exports.checkUsername=function (request,response){
    var username1=request.body.username1;


    var msg_payload = { "username1": username1};

    mq_client.make_request('checkUsername_queue',msg_payload, function(err,results){

        console.log(results);

        if(err){
            console.log("Error");

        }
        else
        {
            if(results.code == 200){
                response.send({'statusCode':200});

            }
            else if (results.code == 400){

                response.send({'statusCode':401});

            }

            else if (results.code == 0){

console.log("operation failed");
            }
        }
    });

}

exports.checkEmail=function (request,response){
    var email1=request.body.email1;


    var msg_payload = { "email1": email1};

    mq_client.make_request('checkEmail_queue',msg_payload, function(err,results){

        console.log(results);

        if(err){
            console.log("Error");

        }
        else
        {
            if(results.code == 200){
                response.send({'statusCode':200});

            }
            else if (results.code == 400){

                response.send({'statusCode':401});

            }

            else if (results.code == 0){

                console.log("operation failed");
            }
        }
    });

}