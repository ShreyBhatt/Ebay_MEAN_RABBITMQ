/**
 * Created by Shrey on 10/28/2016.
 */

var User = require('../models/user');


function handle_request(msg, callback){

    console.log("In handle request of signout");

    var res = {};
    var username = msg.username;
    var lastlogin = msg.lastlogin;


    User.findOneAndUpdate({ username: username }, { lastlogin: lastlogin }, function(err, user) {
        if (err){
            res.code = "0";
        }
        else if (user) {

            res.code = "200";
            res.data = user;

        }

        callback(null, res);

    });
}

exports.handle_request = handle_request;
