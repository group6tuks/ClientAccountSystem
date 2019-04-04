const sqlite3 = require('sqlite3');

class SQLQueries{
    createAccount(user, acc,accType, balance){
         const sqlite3 = require('sqlite3').verbose();
        let stringOut="";
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
            else{
               let sql = `INSERT INTO  Account (accountID, userID, accountType, currentBalance) VALUES(?,?,?,?)`;
                db.each(sql, [user, acc, accType, balance], (err) => {
                if (err) {
                    throw err;
                }
                }); 
            }
        });
        db.close();
    }

    selectAccount(user, callback){
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

        db.each(sql, [user], (err, row) => {
            if (err) {
                throw err;
            }
            return callback(`AccountID: ${row.accountID}, Account Type: ${row.accountType}`);
            
        });
        db.close();
    }


   /*getEntry(){
        const sqlite3 = require('sqlite3').verbose();
        let stringOut="";
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
        });
        let sql = `SELECT * 
                FROM account`;

        db.each(sql, (err, row) => {
            if (err) {
                throw err;
            }
            console.log(`${row.accountID}` + " "+`${row.accountType}` +" " +`${row.currentBalance}`);
            stringOut += `${row.accountID}` + ", ";
        });
        db.close();
        return stringOut;
    }*/

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
        });
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
        db.close();
        return stringOut;
    }

     logWithdrawalTransaction(account,amount){
        const sqlite3 = require('sqlite3').verbose();
        let stringOut;
        let currentDate = new Date(),
            day = currentDate.getDate(),
            month = currentDate.getMonth() + 1,
            year = currentDate.getFullYear();
        let currDate= day + "/" + month + "/" + year;
        let currentTime = new Date(),
            hours = currentTime.getHours(),
            minutes = currentTime.getMinutes();

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        let suffix = "AM";
        if (hours >= 12) {
            suffix = "PM";
            hours = hours - 12;
        }
        if (hours === 0) {
            hours = 12;
        }
        let currTime=hours + ":" + minutes + " " + suffix;
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
        });
        let sql = `INSERT INTO Log Values(?,?,?,?,?)`;
            db.each(sql, ['withdrawal',amount,currDate,currTime,account], (err) => {
                if (err) {
                    throw err;
                }
            });
            let tbalance=selectBalance(account)-amount;
        sql = `UPDATE Account SET balance=?`;
        db.each(sql, [tbalance], (err, row) => {
            if (err) {
                throw err;
            }
            console.log(`${row.account} ${row.transactionType}-R${row.balance}`);
            stringOut =`${row.account} ${row.transactionType}-R${row.amount}, `;
            return stringOut;
        });

    }

     logDepositTransaction(acc,amount,callback){
        const sqlite3 = require('sqlite3').verbose();
        let stringOut;
        let currentDate = new Date(),
            day = currentDate.getDate(),
            month = currentDate.getMonth() + 1,
            year = currentDate.getFullYear();
        let currDate= day + "/" + month + "/" + year;
        let currentTime = new Date(),
            hours = currentTime.getHours(),
            minutes = currentTime.getMinutes();

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        let suffix = "AM";
        if (hours >= 12) {
            suffix = "PM";
            hours = hours - 12;
        }
        if (hours === 0) {
            hours = 12;
        }
        let currTime=hours + ":" + minutes + " " + suffix;
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
        });
        let sql = `INSERT INTO Log(transactionType, amount, date, time, accountID) Values(?,?,?,?,?)`;
        db.each(sql, ['withdrawal',amount,currDate,currTime,acc], (err) => {
            if (err) {
                throw err;
            }
        });
        let tbalance=this.selectBalance(acc)+amount;
        sql = `UPDATE Account SET currentBalance = ? WHERE accountID= ?`;
        db.all(sql, [tbalance, acc], (err, row) => {
            if (err) {
                throw err;
            }
            console.log(`${acc} ${row.transactionType}-R${row.balance}`);
            stringOut =`${account} ${row.transactionType}-R${row.amount}, `;
            callback({stringOut});
        });

    }
     selectBalance(account,callback) {
        const sqlite3 = require('sqlite3').verbose();

        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
            else{
                let sql = `SELECT currentBalance
                FROM Account
                WHERE accountID = ?`;

            db.each(sql, [account], (err, row) => {
            if (err) {
                throw err;
            }
            
            return callback(row.currentBalance);
        });
            }
        });
        
        db.close();
        
        
    }

     deactivateUser(user) {
        const sqlite3 = require('sqlite3').verbose();
        let stringOut="";
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
        });
        let sql = `UPDATE Account
                SET deactivated=?
                WHERE accountID = ?`;

        db.each(sql, [1,user], (err, row) => {
            if (err) {
                throw err;
            }
            console.log(`${row.userID}${row.deactivated}`);
            stringOut=`${row.userID}${row.deactivated}`;
        });
        db.close();
        return stringOut;
    }
}
module.exports = SQLQueries;