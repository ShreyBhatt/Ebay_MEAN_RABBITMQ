var winston = require('winston');

var bid = new (winston.Logger)({
    transports: [
        new (winston.transports.File)( { filename: './Ebay_Client/logs/biddinglog.log', level: 'info', timestamp:false})
    ]
});

module.exports = bid;