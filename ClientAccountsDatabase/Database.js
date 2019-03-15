"use strict";
const sqlite3 = require('sqlite3');
const Promise = require('bluebird')

class Database {
	constructor()
	{
		let db = new sqlite3.Database("./ClientAccountsDatabase.sqlite3", (err) => {
			if (err)
			{
				console.log("Error connecting to database!", err);
			}
			
			db.serialize(function(){
        	console.log('Created/Connected to database!');
				
				  console.log("Created database table Account if it doesnt exist!");
				  db.run("CREATE TABLE IF NOT EXISTS account "+
						  "(accountID INT PRIMARY KEY NOT NULL, "+
						  "userID INT NOT NULL, "+
						  "accountType	CHAR(50), "+
						  "currentBalance	REAL, "+
				      "deactivate TEXT)");
				

				console.log("Created database table Log if it doesnt exist!");
				db.run("CREATE TABLE IF NOT EXISTS Log "+
						"(logID INT PRIMARY KEY	NOT NULL, "+
						"transactionType CHAR(50) NOT NULL, "+
						"amount REAL, "+
						"date TEXT, "+
						"time TEXT, "+
				    "deactivate TEXT, "+
						"accountID INT NOT NULL)");
				
				db.close();
				console.log("Disconnected from database!");		
			});
		});

		
	}

}

const database = new Database();

module.exports = Database;
