const sqlite3 = require('sqlite3');

class SQLQueries{

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
            console.log(`${row.account} ${row.accountType}`);
            stringOut += `${row.account} ${row.accountType}` + ", ";
        });
        db.close();
        return stringOut;
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
                console.log(`${row.account} ${row.transactionType} - ${row.amount}`);
                stringOut =`${row.account} ${row.transactionType} ${row.amount}`+', ';
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
        let sql = `INSERT INTO Log Values(?,?,?,?,?)`;
        db.each(sql, ['withdrawal',amount,currDate,currTime,account], (err) => {
            if (err) {
                throw err;
            }
        });
        let tbalance=selectBalance(account)+amount;
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
     selectBalance(account) {
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
            console.log(`${row.account}-R${row.currentBalance}`);
            num = `${row.currentBalance}`;
        });
        db.close();
        return num;
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