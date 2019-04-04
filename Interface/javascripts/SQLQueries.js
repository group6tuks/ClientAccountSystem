const sqlite3 = require('sqlite3');

class SQLQueries{
    createAccount(user, acc,accType, balance){
         const sqlite3 = require('sqlite3').verbose();
        let stringOut="";
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
        });
         let sql = `INSERT INTO account VALUES(?,?,?,?)`;
        db.each(sql, [user, acc, accType, balance], (err) => {
            if (err) {
                throw err;
            }
        });
    }

    selectAccount(user){
        const sqlite3 = require('sqlite3').verbose();
        let stringOut="";
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
        });
        let sql = `SELECT accountID
                FROM Account
                WHERE userID = ?`;

        db.each(sql, [user], (err, row) => {
            if (err) {
                throw err;
            }
            console.log(`${row.accountID}`);
            stringOut += `${row.accountID}` + ", ";
        });
        db.close();
        return stringOut;
    }


    getEntry(){
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
    }

    selectAccountType(account){
        const sqlite3 = require('sqlite3').verbose();
        let stringOut="";
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
        });
        let sql = `SELECT accountType
                FROM Account
                WHERE accountID = ?`;

        db.each(sql, [account], (err, row) => {
            if (err) {
                throw err;
            }
            console.log(`${account} ${row.accountType}`);
            stringOut += `${account} ${row.accountType}` + ", ";
        });
        db.close();
        return stringOut;
    }

    printMini(account){
        const sqlite3 = require('sqlite3').verbose();
        let stringOut="";
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
        });
        let sql = `SELECT transactionType,amount
                FROM Log
                WHERE accountID = ?`;

        
            db.each(sql, [account], (err, row) => {
                if (err) {
                    throw err;
                }
                console.log(`${account} ${row.transactionType} - ${row.amount}`);
                stringOut =`${account} ${row.transactionType} ${row.amount}`+', ';
            });
           
    
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

     logDepositTransaction(account,amount){
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
        let sql = `INSERT INTO Log Values(?,?,?,?,?,?,?)`;
        db.each(sql, [10,'withdrawal',amount,currDate,currTime,'false',account], (err) => {
            if (err) {
                throw err;
            }
        });
        this.selectBalance(account,function(_amount){
           let tbalance=_amount+amount;
           sql = `UPDATE Account SET balance=?`;
        db.each(sql, [tbalance], (err, row) => {
            if (err) {
                throw err;
            }
            console.log(`${row.account} ${row.transactionType}-R${row.balance}`);
            stringOut =`${row.account} ${row.transactionType}-R${row.amount}, `;
            return stringOut;
        });
        } );
        

    }
     selectBalance(account,callback) {
        const sqlite3 = require('sqlite3').verbose();
        let num=0;
        let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
        });
        let sql = `SELECT currentBalance
                FROM Account
                WHERE accountID = ?`;

        db.each(sql, [account], (err, row) => {
            if (err) {
                throw err;
            }
            //num = parseInt(row.currentBalance);
            //return num;
            /*console.log(`R${row.currentBalance}`);
            console.log(row.currentBalance);*/
            return callback(row.currentBalance);
            //`${row.currentBalance}`;
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