"use strict";
const sqlite3 = require('sqlite3').verbose();
//const Promise = require('bluebird');
// open database in memory
/*let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});*/

/*let db = new sqlite3.Database('./db/users.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the users database.');
});*/

let db = new sqlite3.Database("./ClientAccountsDatabase.sqlite3", (err) => {
		if (err)
		{
			console.log("Error connecting to database!", err);
		}
		//console.log('Connected to the database.');


		db.serialize(function(){
				console.log('Connected to database!');
				
				console.log("Create database table Account");
				db.run("CREATE TABLE IF NOT EXISTS account "+
						"(accountID INT PRIMARY KEY NOT NULL, "+
						"userID INT NOT NULL, "+
						"accountType	CHAR(50), "+
						"currentBalance	REAL, "+
				      		"deactivate TEXT)");
				
				console.log("Create database table Log");
				db.run("CREATE TABLE IF NOT EXISTS Log "+
						"(logID INT PRIMARY KEY	NOT NULL, "+
						"transactionType CHAR(50) NOT NULL, "+
						"amount REAL, "+
						"date TEXT, "+
						"time TEXT, "+
				       		"deactivate TEXT, "+
						"accountID INT NOT NULL)");

				});
	});
 
// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
