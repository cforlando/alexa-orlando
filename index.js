var Alexa = require('alexa-sdk');
var FunFacts = require('./funFacts.json');
var PhoneNumbers = require('./phoneNumbers.json');

var handlers = {
    'GetFunFactsIntent': function() {
        var funFact = getRandomOrlandoFunFact();
        this.emit(':tell', funFact);
    },
    'GetDistrictIntent': function() {
        this.emit(':tell', "This is not implemented yet!");
    },
    'GetNextCityCouncilMeetingIntent': function() {
        this.emit(':tell', "The next City Council meeting will be held on Monday, October 9, 2017 at 2:00 P.M.");
    },
    'GetLocationOfCityCouncilMeetingIntent': function() {
        this.emit(':tell', "City Council meetings are held in Council Chamber, 2nd Floor, City Hall, 400 S. Orange Avenue.  For additional information, please contact the City Clerk’s Office, 407.246.2251.");
    },
    'GetCityClerksPhoneNumber': function() {
        this.emit(':tellWithCard', "You can call the city clerk's office at 407.246.2251", "City Clerk Phone Number", "407-246-2251");
    },
    'GetMayorNameIntent': function() {
        this.emit(':tell', "Buddy Dyer has served as Mayor of the City of Orlando since 2003");
    },
    'GetPhoneNumberIntent' : function() {
        var departmentId = this.event.request.intent.slots.department.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        var responseString = getPhoneNumberForDepartment(departmentId);
        this.emit(':tell', responseString);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    }
};

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function getPhoneNumberForDepartment(department) {
    return PhoneNumbers.phone_numbers[department];
}

function getRandomOrlandoFunFact() {
    var randomIndex = Math.floor(Math.random() * FunFacts.facts.length);
    return FunFacts.facts[randomIndex]
}
