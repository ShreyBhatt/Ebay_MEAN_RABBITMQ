var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var flash = require('connect-flash');
var bcrypt = require('bcrypt-nodejs');
var mq_client = require('../rpc/client');

module.exports = function (passport) {
    passport.use('login', new LocalStrategy({

        usernameField: 'username',
        passwordField: 'password'

    }, function (username, password, done) {

        var msg_payload={"username":username,"password":password}
        mq_client.make_request('login_queue',msg_payload, function(err,results) {
            if (err)
            {
                return done(err);
            }
            if(results)
            {
                console.log(results);
                done(null, results);
            }

        });

    }));
};