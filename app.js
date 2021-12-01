// Importing required modules for Node
var bodyParser = require("body-parser");
var cors = require("cors");
var express = require("express");
var moment = require("moment");
var http = require('http');

// express instance creation
var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

// functionality goes here
app.get("/api/timestamp/:date_string?", function(req, res, next) {
  var now = moment();
  var displayUnix, displayUtc;
  var userDate = req.params.userDate;
  var userDateData = moment(userDate);
  var validInput = moment(userDateData, moment.ISO_8601, true).isValid();
  
  if (userDate === undefined) { // Return current time and date when user doesn't specify
    displayUnix = now.format('x');
    displayUtc = now.format('ddd, DD MMM YYYY hh:mm:ss');
  } else if (validInput) { // Return user submission time and date
    displayUnix = userDateData.format('x');
    displayUtc = userDateData.format('ddd, DD MMM YYYY hh:mm:ss');
  } else { // Show error for misunderstood user input
    res.json({ 'error': 'invalid date' });
  }
  
  res.json({
    unix: displayUnix,
    utc: displayUtc
  });
});

// Set the server to listen for functions on 3000 port
app.listen(process.env.PORT || 3000, function() {
  console.log("server is functioning");
});