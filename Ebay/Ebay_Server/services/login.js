var User = require('../models/user');
var bcrypt=require('bcrypt-nodejs');

function handle_request(msg, callback){

    console.log("In handle request of LOGIN");

    var res = {};
    var username = msg.username;
    var password = msg.password;


    User.find({ username: username }, function(err, results) {
        if (err){
            console.log("Error fetching Login Info");
            res.code = "0";
        }
        else if (results) {
            console.log(results[0]);

            //if (bcrypt.compareSync(password, results[0].password)) {


            console.log("Login successfull");
            res.code = "200";
            res.data = results;
       // }
        } else {
            console.log("data not found");
            res.code = "400";
        }

        callback(null, res);

    });
}

exports.handle_request = handle_request;




