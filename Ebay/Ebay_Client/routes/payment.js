var log = require('./log');



exports.payment=function(request,res)
{

    res.render('payment.ejs',{invalidcard:""});

}