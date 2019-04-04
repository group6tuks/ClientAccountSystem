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
app.use(bodyParser.json({limit: '250mb'}));
app.use(express.static('public'));

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.use(express.static('public'));
    
    app.get('/',function(req,res){
       res.sendFile(__dirname + "/index.html");
    });

app.post('/searchUserID', function(req, res, next) {
  //console.log(req.body.userId);
  queries.getEntry(req.body.userId,function(amount){
    res.json(amount);
  });
});

app.post('/withdraw', function (req, res, next) {
    console.log('request received:', req.body.userID +" and "+ req.body.amount);
      queries.withdraw(req.body.userID, req.body.amount,function(amount){
    res.json({amt : amount});
  });
    //Data from db which will return the accounts Type
   // res.json({ accounttype: type });
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

app.get('/getEntrie', function (req, res) {
  queries.getEntries(function(amount){
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
 