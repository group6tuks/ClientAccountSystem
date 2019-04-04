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
				
				db.run("CREATE TABLE IF NOT EXISTS account "+
						"(accountID INT PRIMARY KEY NOT NULL, "+
						"userID INT NOT NULL, "+
						"accountType	CHAR(50), "+
						"currentBalance	REAL, " +
				      	"active TEXT DEFAULT 'active')");
				
				db.run("CREATE TABLE IF NOT EXISTS Log "+
						"(logID INTEGER PRIMARY KEY AUTOINCREMENT, "+
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