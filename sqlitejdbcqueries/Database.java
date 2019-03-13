package sqlitejdbcqueries;

import java.sql.*;

public class Database
{
	public Database()
	{
		//Connect to Database and Create Tables
		Connection con = null;
		Statement stmt = null;
		try
		{
			Class.forName("org.sqlite.JDBC");
			con = DriverManager.getConnection("jdbc:sqlite:database.db");
			System.out.println("Opened database successfully!");
			
			stmt = con.createStatement();
			String sql = "CREATE TABLE IF NOT EXISTS Account "+
				"(accountID INT PRIMARY KEY NOT NULL, "+
				"userID INT NOT NULL, "+
				"accountType	CHAR(50), "+
				"currentBalance	REAL)";
			
			stmt.executeUpdate(sql);
			stmt.close();
			stmt = null;
			
			stmt = con.createStatement();
			
			sql = "CREATE TABLE IF NOT EXISTS Log "+
				"(logID INT PRIMARY KEY	NOT NULL, "+
				"transactionType CHAR(50) NOT NULL, "+
				"amount REAL, "+
				"date TEXT, "+
				"time TEXT, "+
				"accountID INT NOT NULL)";
			
			stmt.executeUpdate(sql);
			stmt.close();
			
			con.close();
		}
		catch(Exception e)
		{
			System.err.println(e.getClass().getName() + ": " + e.getMessage());
			System.exit(0);
		}
		
		
	}

}
