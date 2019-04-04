const sqlite3 = require('sqlite3');
const app = require('express');

class SQLQueries{
    createAccount(user, callback){
         const sqlite3 = require('sqlite3').verbose();
        let stringOut="";
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return callback(err.message);
            }
            else{
                var accountTypes = ["Debit", "Cheque", "Savings"];
                var accType =  accountTypes[Math.floor(Math.random()*accountTypes.length)];

               let sql = `INSERT INTO  Account (userID, accountType) VALUES(?,?)`;
                db.each(sql, [user, accType], (err) => {
                if (err) {
                    callback(err);
                }
                    return callback("Entry created");
                }); 
            }
            
        });

         db.close();
       
    }

    getAccounts(user, callback){
        const sqlite3 = require('sqlite3').verbose();
        let stringOut="";
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
        });
        let sql = `SELECT accountID, accountType
                FROM Account
                WHERE userID = ?`;

        db.all(sql, [user], (err, row) => {
            if (err) {
                throw err;
            }
            return callback(row);
            
        });
        db.close();
    }


   getEntry(user, callback){
        const sqlite3 = require('sqlite3').verbose();
        let stringOut="";
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
        });
        let sql = `SELECT * 
                FROM account WHERE userID= ?`;

        db.all(sql,[user], (err, row) => {
            if (err) {
                throw err;
            }
            return callback(row);
        });
        db.close();
        
    }

    getEntries(callback){
        const sqlite3 = require('sqlite3').verbose();
        let stringOut="";
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
        });
        let sql = `SELECT * 
                FROM account`;

        db.all(sql, (err, row) => {
            if (err) {
                throw err;
            }
            return callback(row);
        });
        db.close();
        
    }

    selectAccountType(account, callback){
        const sqlite3 = require('sqlite3').verbose();
        let stringOut="";

        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
            else{
                 let sql = `SELECT accountType
                FROM Account
                WHERE accountID = ?`;

                db.each(sql, [account], (err, row) => {
                    if (err) {
                        throw err;
                    }
                    
                    stringOut += `${row.accountType}`;
                    return callback(stringOut);
                });
            }
        });

        db.close();
        
    }

    printMini(account){
        const sqlite3 = require('sqlite3').verbose();
        let stringOut="";
        let i=0;
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
                let sql = `SELECT transactionType,amount
                    FROM Log
                    WHERE accountID = ?`;

                while(i<5){
                    db.each(sql, [account], (err, row) => {
                        if (err) {
                            throw err;
                        }
                        console.log(`${account} ${row.transactionType} - ${row.amount}`);
                        stringOut =`${account} ${row.transactionType} ${row.amount}`+', ';
                    });
                }
        });
        
        db.close();
        return stringOut;
    }

     withdraw(accID,amount,callback){
        const sqlite3 = require('sqlite3').verbose();
        let stringOut;
        this.selectBalance(accID, function(amt){
            let sql = `UPDATE Account SET currentBalance = ? WHERE accountID= ?`;

            if(parseInt(amount) > parseInt(amt)){
                return callback('Insuffient funds');
            }

            let tbalance= parseInt(amt) - parseInt(amount);
            let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    return console.error(err.message);
                }
                else{
                      db.all(sql, [tbalance, accID], (err, row) => {
                        if (err) {
                            throw err;
                        }
                       
                        return callback('Success, new balance: '+  tbalance);
                    });
                }
            });

            db.close();
        });
}
     deposit(accID,amount,callback){
        const sqlite3 = require('sqlite3').verbose();
        let stringOut;
        this.selectBalance(accID, function(amt){
            let sql = `UPDATE Account SET currentBalance = ? WHERE accountID= ?`;
            console.log(amt);
            let tbalance=parseInt(amount) + parseInt(amt);
            let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    return console.error(err.message);
                }
                else{
                      db.all(sql, [tbalance, accID], (err, row) => {
                        if (err) {
                            throw err;
                        }
                       
                        return callback('Success, new balance: '+  tbalance);
                    });
                }
            });

            db.close();
        });

    }

     selectBalance(account,callback) {
        const sqlite3 = require('sqlite3').verbose();

        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
            else{
                let sql = `SELECT currentBalance FROM Account WHERE accountID = ?`;

                db.each(sql, [account], (err, row) => {
                    if (err) {
                        throw err;
                    }
                    
                    return callback(parseInt(row.currentBalance));
                });
            }
        });
        
        db.close();
        
        
    }

     deactivateUser(user, callback) {
        const sqlite3 = require('sqlite3').verbose();
        let stringOut="";
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
            else{
                let sql = `UPDATE Account
                SET active='deactivated'
                WHERE userID = ?`;

                db.each(sql, [user], (err, row) => {
                    if (err) {
                        throw err;
                    }
                     return callback('deactivated successfully');
                });
            }
        });
        
        db.close();
    }

    activateUser(user, callback) {
        const sqlite3 = require('sqlite3').verbose();
        let stringOut="";
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }else{
                 let sql = `UPDATE Account
                SET active='active'
                WHERE userID = ?`;

                db.each(sql, [user], (err, row) => {
                    if (err) {
                        throw err;
                    }
                    return callback('re-activated successfully');
                    
                });
            }
        });
       
        db.close();
    }
}
module.exports = SQLQueries;