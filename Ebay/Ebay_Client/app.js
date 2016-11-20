var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
var users = require('./routes/users');

var login = require("./routes/login");
var cart = require("./routes/shoppingcart");


var passport = require('passport');
require('./routes/passport')(passport);



var creditcard = require('./routes/creditcard');
var register=require('./routes/register');
var home=require('./routes/home');
var profile=require('./routes/profile');
var payment=require('./routes/payment');
var myebaybutton=require('./routes/myebaybutton');
var advertisement=require('./routes/advertisement');
var productdetail=require('./routes/productdetail');

var bidproductdetail=require('./routes/bidproductdetail');

var shoppingcart=require('./routes/shoppingcart');
var lastlogin=require('./routes/lastlogin');
var log=require('./routes/log');
var biddinglog=require('./routes/biddinglog');
var bid=require('./routes/bid');
var bidinglogic=require('./routes/biddinglogic');




var order=require('./routes/myorders');


var session = require('client-sessions');
var mongoSessionConnectURL = "mongodb://localhost:27017/Ebay";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);



// mongoose.connect(mongoSessionConnectURL,{server:{poolSize:1}});

var app = express();

app.use(expressSession({
  secret: 'Ebay',
  resave: false,  //don't save session if unmodified
  saveUninitialized: false,	// don't create session until something stored
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  store: new mongoStore({
    url: mongoSessionConnectURL
  })
}));




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());



app.use('/', routes);
app.use('/users', users);

//app.get('/homepage',login.redirectToHomepage);



//POST Requests
app.post('/bidding', bid.bidding);

app.post('/checkLogin', login.checkLogin);
app.post('/checkRegister', login.checkRegister);
app.post('/validate',creditcard.validate);
app.post('/checkEmail',register.checkEmail);
app.post('/checkUsername',register.checkUsername);
app.post('/postadvertise',advertisement.postadvertise);
app.post('/getcart', cart.getcart);
app.post('/postbid',bid.postbid);






//GET Requests
app.get('/remove', cart.remove);

app.get('/cart', cart.cart);
app.get('/signout',login.signout);
app.get('/createacc',login.createacc);
app.get('/homepage',home.homepage);
app.get('/allbidpage',home.allbidpage);


app.get('/ProfilePage',profile.ProfilePage);
app.get('/payment',payment.payment);
app.get('/advertisement',myebaybutton.advertisement);
app.get('/myadvertisement',myebaybutton.myadvertisement);
app.get('/mybids',myebaybutton.mybids);

app.get('/bid',myebaybutton.bid);

app.get('/displayadvertise',advertisement.displayadvertise);
app.get('/displayorders',order.displayorders);

app.get('/displayallbid',bid.displayallbid);
app.get('/displaybid',bid.displaybid);

app.get('/lastlogin',lastlogin.lastlogin);


app.get('/displayalladvertise',advertisement.displayalladvertise);


app.get('/myorders',myebaybutton.myorders);
app.get('/productdetail',productdetail.productdetail);

app.get('/bidproductdetail',bidproductdetail.bidproductdetail);

app.get('/addcart',productdetail.addcart);




app.all('*', function findLastVisit(req, res, next) {
  if (req.session.visited)
    req.lastVisit = req.session.visited;

  req.session.visited = Date.now();

  next();
});











// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
