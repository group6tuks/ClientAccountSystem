const sqlite3 = require('sqlite3');
const app = require('express');
const reporting = require('Reporting');

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
                db.run(sql, [user, accType], (err) => {
                if (err) {
                    callback(err);
                }
                    return callback("Entry created");
                }); 
            }
            
        });

         db.close();
       
     //-----Reporting------
        
    var rep = new reporting.Reporting();
    rep.log('1', user, -1, "-1", 0.0);

    //-------------------
        
    }

    createAccount(user, amount, callback){
         const sqlite3 = require('sqlite3').verbose();
        let stringOut="";
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return callback(err.message);
            }
            else{
                var accountTypes = ["Debit", "Cheque", "Savings"];
                var accType =  accountTypes[Math.floor(Math.random()*accountTypes.length)];

               let sql = `INSERT INTO  Account (userID, accountType, currentBalance) VALUES(?,?,?)`;
                db.run(sql, [user, accType,amount], (err) => {
                if (err) {
                    callback(err);
                }

                let accID = db.get('SELECT accountID FROM Account WHERE userID=?', [user], (err)=>{
                    if (err) {
                        callback(err);
                    }
                });

                sql = `INSERT INTO Log(transactionType,amount, accountID) Values(?,?,?)`;
                db.run(sql, ['deposit',amount,accID], (err) => {
                    if (err) {
                        callback(err);
                    }
                    
                }); 

                return callback("Entry created");
            });
            
        }

         db.close();
       
    });
        
    //-----Reporting------
        
    var rep = new reporting.Reporting();
    rep.log('7', user, accID, accType, -1);

    //-------------------
        
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
        
        //-----Reporting------
        
        var rep = new reporting.Reporting();
        rep.log('2', user, -1, "-1", -1);
        
        //-------------------
        
    }


   getEntry(user, callback){
        const sqlite3 = require('sqlite3').verbose();
        let stringOut="";
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
            let sql = `SELECT * 
                FROM account WHERE userID= ?`;

            db.all(sql,[user], (err, row) => {
                if (err) {
                    throw err;
                }
                return callback(row);
            });
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

    printMini(accID, callback){
        const sqlite3 = require('sqlite3').verbose();
        let stringOut="";
        let i=0;
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return callback(err.message);
            }
                let sql = `SELECT transactionType, amount, date, time
                    FROM Log
                    WHERE accountID = ?
                    ORDER BY date, time DESC LIMIT 6`;

                 db.all(sql,[accID], (err, row) => {
                    if (err) {
                        throw err;
                    }
                    stringOut += `${row.transactionType} + '  R' +${row.amount}, ' date: '+ ${row.date} ${row.time}\n `;
                    return callback(row);
                });
        });
        
        db.close();
        
        //-----Reporting-----
        
        var rep = new reporting.Reporting();
        rep.log('4', -1, accID, "-1", -1);
        
        //-------------------
        
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
                            return callback(err);
                        }
                        sql = `INSERT INTO Log(transactionType,amount, accountID) Values(?,?,?)`;
                            db.run(sql, ['withdraw',amount,accID], (err) => {
                                if (err) {
                                    callback(err);
                                }
                           
                            return callback('Success, new balance: '+  tbalance);
                        });
                    });
                }
            });

            db.close();
        });
        
        //-----Reporting-----
        
        var rep = new reporting.Reporting();
        rep.log('5', -1, accID, "-1", amount);
        
        //-------------------
        
}

    deposit(accID,amount,callback){
        const sqlite3 = require('sqlite3').verbose();
        let stringOut;

        this.selectBalance(accID, function(amt){
                let sql = `UPDATE Account SET currentBalance = ? WHERE accountID= ?`;

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
                            sql = `INSERT INTO Log(transactionType,amount, accountID) Values(?,?,?)`;
                            db.run(sql, ['deposit',amount,accID], (err) => {
                                if (err) {
                                    callback(err);
                                }
                           
                            return callback('Success, new balance: '+  tbalance);
                        });
                    });
                };

                db.close();
            });

        });
        
        //-----Reporting-----
        
        var rep = new reporting.Reporting();
        rep.log('6', -1, accID, "-1", amount);
        
        //-------------------
        
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
        
        //-----Reporting-----
        
        var rep = new reporting.Reporting();
        rep.log('3', -1, account, "-1", -1);
        
        //-------------------
        
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

                db.run(sql, [user], (err, row) => {
                    if (err) {
                        throw err;
                    }
                     return callback('deactivated successfully');
                });
            }
        });
        
        db.close();
        
        //-----Reporting------
        
        var rep = new reporting.Reporting();
        rep.log('8', user, -1, "-1", -1);
        
        //-------------------
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

                db.run(sql, [user], (err, row) => {
                    if (err) {
                        throw err;
                    }
                    return callback('re-activated successfully');
                    
                });
            }
        });
       
        db.close();
        
        //-----Reporting------
        
        var rep = new reporting.Reporting();
        rep.log('9', user, -1, "-1", -1);
        
        //--------------------
    }


    getLogEntries(callback){
        const sqlite3 = require('sqlite3').verbose();
        let stringOut="";
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return callback(err.message);
            }
        });
        let sql = `SELECT * 
                FROM Log`;

        db.all(sql, (err, row) => {
            if (err) {
                callback(err);
            }
            return callback(row);
        });
        db.close();
        
    }

    getLogEntry(accID, callback){
        const sqlite3 = require('sqlite3').verbose();
        let stringOut="";
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return callback(err.message);
            }
        });
        let sql = `SELECT * 
                FROM Log WHERE accountID=?`;

        db.all(sql,[accID], (err, row) => {
            if (err) {
                callback(err);
            }
            return callback(row);
        });
        db.close();
        
    }


}


module.exports = SQLQueries;
