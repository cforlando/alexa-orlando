var Alexa = require('alexa-sdk');

var handlers = {
    'GetDistrictIntent': function() {
        this.emit(':tell', 'Hello World!');
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};