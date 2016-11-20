
var User = require('../models/user');

function handle_request(msg, callback){

    console.log("In handle request of Register");

    var res = {};
    var username = msg.username;
    var email = msg.email;
    var password = msg.password;
    var birthdate = msg.birthdate;
    var location = msg.location;
    var contact = msg.contact;
    var lastlogin = msg.lastlogin;
    var user=new User();


    user.username=username;
    user.email=email;
    user.password=password;
    user.birthdate=birthdate;
    user.location=location;
    user.contact=contact;
    user.lastlogin=lastlogin;

    user.save(function(err,results){
        if (err){
            console.log("Error fetching Registration Info");
            res.code = "0";
        }
        else if (results) {

            console.log("Registration successfull");
            res.code = "200";
            res.data = results;

        }

        callback(null, res);

    });
}

exports.handle_request = handle_request;




