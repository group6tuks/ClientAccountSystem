  
const sqlite3 = require('sqlite3').verbose();
const dbInit = require('./javascripts/Database');
const dbQueries = require('./javascripts/SQLQueries');
const queries = new dbQueries;
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 8080;

//data from db
var acc1 = "34512";
var type = "savings";

    app.use(bodyParser.json({limit: '250mb'}));
    app.use(express.static('public'));
    
    app.get('/',function(req,res){
       res.sendFile(__dirname + "/index.html");
    });

app.post('/searchUserID', function(req, res, next) {
    var cope = req.body;
        console.log('request received:', req.body);
        //Data from db which will return the accounts linked to the user
    res.json({account: acc1 });
});


// Given the accountID, return the account type
app.post('/searchaccountID', function (req, res, next) {
    var cope = req.body;
    console.log('request received:', req.body);
    //Data from db which will return the accounts Type
    res.json({ accounttype: type });
});


  
app.listen(port,() =>{
    console.log("listen " + port + "...");
});
