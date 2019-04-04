"use strict";
const sqlite3 = require('sqlite3');

class Database {
	constructor()
	{
		let db = new sqlite3.Database("./ClientAccountsDatabase.sqlite3", (err) => {
			if (err)
			{
				console.log("Error connecting to database!", err);
			}

			db.serialize(function(){
				//console.log('Connected to database!');
				//console.log("Create database table Account");
				db.run("CREATE TABLE IF NOT EXISTS account "+
						"(accountID INT PRIMARY KEY NOT NULL, "+
						"userID INT NOT NULL, "+
						"accountType	CHAR(50), "+
						"currentBalance	REAL)");
				
				//console.log("Create database table Log");
				db.run("CREATE TABLE IF NOT EXISTS Log "+
						"(logID INT PRIMARY KEY	NOT NULL, "+
						"transactionType CHAR(50) NOT NULL, "+
						"amount REAL, "+
						"date TEXT, "+
						"time TEXT, "+
						"accountID INT NOT NULL)");
			});
		});
	}
}
const database = new Database();
module.exports = Database;