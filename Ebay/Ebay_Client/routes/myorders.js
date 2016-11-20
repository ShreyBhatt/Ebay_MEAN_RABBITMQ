var log = require('./log');
var mq_client = require('../rpc/client');


exports.displayorders=function(request,res)

{

    var userid = request.session.userid;


    var msg_payload = { "userid":userid};
    mq_client.make_request('displayorders_queue',msg_payload, function(err,results){

        console.log(results);

        if(err){
            console.log("Error");

        }
        else
        {
            if(results.code == 200){
                for(var i=0;i<results.length;i++)
                {
                    results[i].date=new Date(Number(results[i].date)).toDateString();
                }
                log.log('info', request.session.username + " | Display My Orders | " + new Date().toString());
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