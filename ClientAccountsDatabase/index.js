"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const dbInit = require('./Database');
const sqlite3 = require('sqlite3').verbose();
const dbQueries = require('./SQLQueries');
const queries = new dbQueries;
var app = express();

//Setting up server
 var server = app.listen(process.env.PORT || 8081, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

// Setting Base directory
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
});


												/**			API		**/

app.post('/create/:userID', function (req, res) {
  queries.createAccount(req.params.userID,function(amount){
  	res.end(amount);
  });
});


app.get('/balance/:accountID', function (req, res) {
  queries.selectBalance(req.params.accountID,function(amount){
  	res.end(JSON.stringify(amount));
  });
});

app.get('/accountType/:accountID', function (req, res) {
  queries.selectAccountType(req.params.accountID,function(amount){
  	res.end(JSON.stringify(amount));
  });
});

app.get('/getAccounts/:userID', function (req, res) {
  queries.getAccounts(req.params.userID,function(amount){
  	res.end(JSON.stringify(amount));
  });

});

app.get('/getEntry/:userID', function (req, res) {
  queries.getEntry(req.params.userID,function(amount){
  	res.end(JSON.stringify(amount));
  });
});

app.get('/getEntries', function (req, res) {
  queries.getEntries(function(amount){
  	res.end(JSON.stringify(amount));
  });
});

app.get('/getLogEntries', function (req, res) {
  queries.getLogEntries(function(amount){
  	res.end(JSON.stringify(amount));
  });
});

app.get('/getLogEntry/:accID', function (req, res) {
  queries.getLogEntry(req.params.accID, function(amount){
  	res.end(JSON.stringify(amount));
  });
});

app.put('/deactivate/:userID', function (req, res) {
  queries.deactivateUser(req.params.userID,function(amount){
  	res.send(amount);
  });
});

app.put('/activate/:userID', function (req, res) {
  queries.activateUser(req.params.userID,function(amount){
  	res.send(amount);
  });
});

app.put('/deposit/:accID/:amount', function (req, res) {
  queries.deposit(req.params.accID, req.params.amount,function(amount){
  	res.send(amount);
  });
});

app.put('/withdraw/:accID/:amount', function (req, res) {
  queries.withdraw(req.params.accID, req.params.amount,function(amount){
  	res.send(amount);
  });
});


/*db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  //console.log('Close the database connection.');
});*/
 