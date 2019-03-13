/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sqlitejdbcqueries;

import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.format.DateTimeFormatter;  
import java.time.LocalDateTime;    
/**
 *
 * @author Baven
 */
public class SQLiteJDBCQueries {

    /**
     * @param args the command line arguments
     */
    private Connection connect() {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlite:database.db");
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return conn;
    }
     public void insertAccount(){
        String sql = "INSERT INTO Account Values("+1+","+1+","+"'savings',"+10000+")";
        
        try (Connection conn = this.connect();
             Statement stmt  = conn.createStatement();
             ResultSet rs    = stmt.executeQuery(sql)){
            while (rs.next()) {
                System.out.println(rs.getString("accountID") + "\t" );
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
    
     public void selectAccount(String user){
        String sql = "SELECT accountID FROM Account WHERE userID=''"+user;
        
        try (Connection conn = this.connect();
             Statement stmt  = conn.createStatement();
             ResultSet rs    = stmt.executeQuery(sql)){
            while (rs.next()) {
                System.out.println(rs.getString("accountID") + "\t" );
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
      public void selectAccountType(String account){
        String sql = "SELECT accountType FROM Account WHERE AccountID=''"+account;
        
        try (Connection conn = this.connect();
             Statement stmt  = conn.createStatement();
             ResultSet rs    = stmt.executeQuery(sql)){
            
            // loop through the result set
            while (rs.next()) {
                System.out.println(rs.getString("accountType") + "\t" );
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
            public float selectBalance(String account){
        String sql = "SELECT currentBalance FROM Account WHERE AccountID=''"+account;
        
        try (Connection conn = this.connect();
             Statement stmt  = conn.createStatement();
             ResultSet rs    = stmt.executeQuery(sql)){
            
            // loop through the result set
       
        return rs.getFloat("currentBalance");
    
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return 0;
    }
        public void printMini(String account){
        String sql = "SELECT transactionType,amount FROM Log WHERE AccountID=''"+account;
        
        try (Connection conn = this.connect();
             Statement stmt  = conn.createStatement();
             ResultSet rs    = stmt.executeQuery(sql)){
            
            int count=0;
            while (rs.next()&&count<6) {
                System.out.println(rs.getString("transactionType") + "\t"+rs.getFloat("amount") + "\t" );
                count++;
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
        public void logWithdrawalTransaction(String account,Float amount){
        DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy/MM/dd");  
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter dt = DateTimeFormatter.ofPattern("HH:mm:ss\n");  
        LocalDateTime nowt = LocalDateTime.now();
        String sql = "INSERT INTO Log Values('withdrawal',"+amount+","+now+","+nowt+","+account+")";
        
        try (Connection conn = this.connect();
             Statement stmt  = conn.createStatement();
             ResultSet rs    = stmt.executeQuery(sql)){
            
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        float tbalance=selectBalance(account)-amount;
       sql = "UPDATE Account SET balance=''"+tbalance;
        
        try (Connection conn = this.connect();
             Statement stmt  = conn.createStatement();
             ResultSet rs    = stmt.executeQuery(sql)){
            
            while (rs.next()) {
                System.out.println(rs.getString("accountID") + "\t"+rs.getFloat("amount") + "\t" );
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
        public void logDepositTransaction(String account,Float amount){
        DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy/MM/dd");  
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter dt = DateTimeFormatter.ofPattern("HH:mm:ss\n");  
        LocalDateTime nowt = LocalDateTime.now();
        String sql = "INSERT INTO Log Values('withdrawal',"+amount+","+now+","+nowt+","+account+")";
        
        try (Connection conn = this.connect();
             Statement stmt  = conn.createStatement();
             ResultSet rs    = stmt.executeQuery(sql)){
            
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        float tbalance=selectBalance(account)+amount;
       sql = "UPDATE Account SET balance=''"+tbalance;
        
        try (Connection conn = this.connect();
             Statement stmt  = conn.createStatement();
             ResultSet rs    = stmt.executeQuery(sql)){
            
            while (rs.next()) {
                System.out.println(rs.getString("accountID") + "\t"+rs.getFloat("amount") + "\t" );
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
    
}
