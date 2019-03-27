  const sqlite3 = require('sqlite3').verbose();
 
  let db = new sqlite3.Database('./db/ClientAccountsDatabase.sqlite3');
 
  // insert one row into the langs table
  db.run(`INSERT INTO langs(name) VALUES(?)`, ['Lebo'], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
 
  // close the database connection
  db.close();