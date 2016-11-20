exports.homepage=function(request,res)
{

    res.render('homepage.ejs',{invalid:""});

}


exports.allbidpage=function(request,res)
{

    res.render('allbids.ejs',{invalid:""});

}