"use strict";
const express = require('express');
const dbInit = require('./Database');
const sqlite3 = require('sqlite3').verbose();
const dbQueries = require('./SQLQueries');
const queries = new dbQueries;

let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
});

db.serialize(() =>{
	
	/*db.run("INSERT INTO account (accountID, userID, accountType, currentBalance) VALUES (569,1, 'Cheque', 600.00)");
	db.run("INSERT INTO account (accountID, userID, accountType, currentBalance) VALUES (404,22, 'Savings', 1000.00)");
	db.run("INSERT INTO account (accountID, userID, accountType, currentBalance) VALUES (200,1, 'Cheque', 80.00)");
	db.run("INSERT INTO account (accountID, userID, accountType, currentBalance) VALUES (698,12, 'Debit', 800.00)");
	db.run("INSERT INTO account (accountID, userID, accountType, currentBalance) VALUES (165,12, 'Debit', 800.00)");*/

	/*queries. createAccount(569,1,'Debit',10000);
	queries. createAccount(404,3,'Savings', 600);
	queries. createAccount(200,2,'Debit',80);
	queries. createAccount(698,2,'Cheque', 5000);
	queries. createAccount(123,3,'Debit',10000);
	queries. createAccount(145,4,'Savings', 200);
	queries. createAccount(658,5,'Debit',10000);
	queries. createAccount(156,9,'Cheque', 5000);*/
	
	db.serialize(() =>{
		

		queries.selectAccount(1,function(accounts){
				console.log("Accounts of user 1: \n" + accounts);
		} );
		
		queries.selectAccount(3,function(accounts){
				console.log("Accounts of user 3: \n" + accounts);
		} );

		queries.selectBalance(569,function(amount){
				console.log("R" + amount);
		} );
		/*queries.selectAccountType(569, function(type){
			console.log("Account type of accountID 569: " + type);
		});*/
		/*queries.deactivateUser(2, function(active){
			console.log("deactivation:" + active);
		});*/
		/*queries.logWithdrawalTransaction(145,100, function(Balance){
			console.log("Withdrawl:"  + balance );
		})*/
	});

});


db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  //console.log('Close the database connection.');
});
 