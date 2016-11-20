/**
 * Created by Shrey on 10/29/2016.
 */

var User = require('../models/user');

function handle_request(msg, callback){

    console.log("In handle request of profile");

    var res = {};
    var username = msg.username;

    User.find({ username: username}, function(err, results) {
        if (err){
            console.log("Error fetching profile Info");
        }
        else if (results) {

            console.log("Fetched profile successfull");
            res.code = "200";
            res.data = results;

        } else {
            console.log("Fetched profile not successfull");
            res.code = "400";
        }

        callback(null, res);

    });

}
exports.handle_request = handle_request;