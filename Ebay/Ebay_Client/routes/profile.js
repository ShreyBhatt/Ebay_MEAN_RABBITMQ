var log = require('./log');
var mq_client = require('../rpc/client');

exports.ProfilePage=function(request,res)

{

    var username = request.session.username;

    var msg_payload = {"username": username};

    mq_client.make_request('lastlogin_queue', msg_payload, function(err, results){
        if(err){
            console.log(err);
        }
        else
        {
            if(results.code == 200){
                log.log('info', request.session.username + " | User Profile | " + new Date().toString());

                console.log(results);
                res.render("ProfilePage.ejs",{result:results.data});           }
            else if (results.code == 400){

                console.log("Unsuccessful");
            }
        }
    })

};