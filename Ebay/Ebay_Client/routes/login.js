var moment = require('moment');
var bcrypt=require('bcrypt-nodejs');
var log = require('./log');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mq_client = require('../rpc/client');


exports.checkRegister=function(request,res)
{

    var username=request.body.username1;
    var email=request.body.email1;
    var password=request.body.password1;
    var birthdate=request.body.birthdate;
    var location=request.body.location;
    var contact=request.body.contact;
   // var encrypt=bcrypt.hashSync(password);

    var lastlogin=moment().format('MMMM Do YYYY, h:mm:ss a');

    var msg_payload = { "username": username, "email": email, "password": password, "birthdate": birthdate,"location": location,"contact": contact,"lastlogin": lastlogin};

    try {

        mq_client.make_request('register_queue', msg_payload, function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                if (results.code == 200) {
                    console.log("Successful SignUp");
                }
                else if (results.code == 0) {

                    console.log("Unsuccessful SignUP");
                }
            }
        })
        res.render('login.ejs', {invalid: ""});
    }catch (Exception){

        console.log("Exception in SignUp");
    }
}
exports.checkLogin=function(req,res,next)
{

    try {
        passport.authenticate('login', function (err, results, info) {
            if (err) {
                console.log(err);
            }
            else {
                if (results.code == 200) {
                    console.log("Successful Login");
                    console.log("will renderfile");
                    console.log(results);
                    req.session.username = results.data[0].username;
                    req.session.userid = results.data[0]._id;
                    console.log(req.session.userid);
                    return res.render('homepage.ejs');
                }
                else if (results.code == 400) {
                    return res.render('login', {invalid: "Invalid Username or password"});
                }
                else if (results.code == 0) {
                    console.log("DB Operation Failed");
                }
            }
        })(req, res, next);
    }catch(Exception){

        console.log(Exception);
    }
        }


exports.signout=function(request,res)
{

    var username = request.session.username;


    var msg_payload = { "username": username,"lastlogin": moment().format('MMMM Do YYYY, h:mm:ss a')};

    mq_client.make_request('signout_queue', msg_payload, function(err, results){
        if(err){
            console.log(err);
            //throw err;
        }
        else
        {
            if(results.code == 200){
                console.log("last login updated");
            }
            else if (results.code == 0){

                console.log("Unsuccessful update of lastlogin");
            }
        }
    })



    log.log('info', request.session.username + " | Sign Out | " + new Date().toString());

    request.session.destroy();
    res.redirect('/');

    console.log("session reset");

}


exports.createacc=function(request,res)
{
    log.log('info', request.session.username + " | Redirect to Registration Page | " + new Date().toString());

    res.render('login.ejs',{invalid:""});

}



