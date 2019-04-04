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
	//console.log('Populating database');

	//db.run("INSERT INTO account (accountID, userID, accountType, currentBalance) VALUES (52588,1, 'Cheque', 600.00)");
	/*db.run("INSERT INTO account (accountID, userID, accountType, currentBalance) VALUES (2,22, 'Savings', 1000.00)");
	db.run("INSERT INTO account (accountID, userID, accountType, currentBalance) VALUES (3,1, 'Cheque', 80.00)");
	db.run("INSERT INTO account (accountID, userID, accountType, currentBalance) VALUES (4,12, 'Debit', 600.00)");*/

	db.serialize(() =>{

		var userid = 1;
		console.log("");
		console.log("Test 1: Returning list of accounts associated with user ID " + userid + ":")
		console.log("Account Number(s):");
		console.log(queries.selectAccount(userid));

		console.log("Test 2: Returning account type using accountID:");
		console.log(queries.selectAccountType(1));

		console.log("Test 3: Given the accountID, return the current balance:");
		queries.selectBalance(587585,function(amount){
			console.log("R" + amount);
		} );

		console.log("Test 4: Given the accountID, return a mini-statement:");
		console.log(queries.printMini(125875));
/*
		console.log("Test 4: Given the accountID, and an amount, log a withdrawal transaction and update the current balance:");
		console.log(queries.logWithdrawalTransaction(125875,100));

*/
		/*console.log("Test 5: Given the accountID, and an amount, log a deposit transaction and update the current balance:");
		queries.logDepositTransaction(587585,100,function(amount){
			console.log("R" + amount);
		} );*/
		/*
*/

		//queries. createAccount(8,1,'Cheque', 5000);
		//queries. createAccount(9,3,'Cheque', 5000);
		/*console.log(queries.selectAccount(9));
		console.log(queries.getEntry());
		console.log(queries.selectAccountType(1));*/
		//console.log('Balance:' + queries.selectBalance(1));
	});

});


db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  //console.log('Close the database connection.');
});
 