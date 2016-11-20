var log = require('./log');


exports.advertisement=function(request,res)
{

    res.render('advertisementdetails.ejs',{invalid:""});

}

exports.bid=function(request,res)
{

    res.render('biddetails.ejs',{invalid:""});

}
exports.mybids=function(request,res)
{

    res.render('mybids.ejs',{invalid:""});

}


exports.myorders=function(request,res)
{

    res.render('myorders.ejs',{invalid:""});

}

exports.myadvertisement=function(request,res)
{

    res.render('myadvertisement.ejs',{invalid:""});

}

exports.mybids=function(request,res)
{

    res.render('mybids.ejs',{invalid:""});

}