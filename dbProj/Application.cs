/*
using System.Net;
using MySql.Data.MySqlClient;
using Microsoft.JSInterop;
using System.Net.Mail;
using System.Runtime.InteropServices.JavaScript;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Mvc;
using Mysqlx;
// Use MySql.Data for MySQL
public static class Globals {
    // Correct MySQL connection string
    public static string connectionString = "Server=16.170.225.238;Port=3306;Database=Shop;User Id=foo;Password=hejhej;";
}

[ApiController]
[Route("api/[controller]")]
public class Application : ControllerBase {
    static void Main() {
        //InsertProduct("'rubberBall'", 10, 1, 5);
        //addProductQuantity("rubberBall", 5);
        //depleteProductQuantity("rubberBall", 2);
        //alterProductPrice("rubberBall", 1337);
        //insertIntoCart(1, 2, 9, 16);
        //updateCarts(2, 2, 7, 20);
    }
    [HttpGet("makeconnection")]
    static void makeConnection(string SQLQuery) {
        Console.WriteLine("Connecting to MySQL...");
        using (MySqlConnection connection = new MySqlConnection(Globals.connectionString)) {
            try {
                connection.Open();
                Console.WriteLine("Connected to MySQL successfully!");           
                // Execute query
                using (MySqlCommand command = new MySqlCommand(SQLQuery, connection)) {
                    int rowsAffected = command.ExecuteNonQuery();
                    Console.WriteLine($"{rowsAffected} row(s) inserted successfully.");
                }
            } catch (Exception ex) {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }
        }
    }

    //USER METHODS
    [HttpGet("insertuser")]
    public static void InsertUser(string role, int shpCrtId, int balance, char acctName) {
        string SQLQuery = "INSERT into Users (role, Shopping_Cart_id, Balance, Account_name) VALUES ('" + role + "', " + shpCrtId + ", " + balance + ", " + acctName + ");";
        makeConnection(SQLQuery);
    }
    [HttpGet("balanceusermath")]
    public static void balanceUserMath(char AcctName, int Math) {          //decrease or increase balance based on deposits or purchases
        string SQLQuery = "UPDATE Users SET Balance = Balance + " + Math + " WHERE Account_name = " + AcctName + ";";
        makeConnection(SQLQuery);
    }
<<<<<<< HEAD

    [JSInvokable]
    static void /* bool*/ 
    /*checkAdmin(char AcctName) {           //check if admin privileges should be granted during session
=======
    [HttpGet("checkadmin")]
    public static void /* bool*/ checkAdmin(char AcctName) {           //check if admin privileges should be granted during session
>>>>>>> main
        string SQLQuery = "SELECT role FROM Users WHERE role = 'admin';";    //NOT FUNCTIONAL YET 
    }
*/
/*
    //ORDER METHODS
    [HttpGet("alterorderstatus")]
    public static void AlterOrderStatus() {            //switches  order status between finished, pending or cancelled

    }

    //CART METHODS

    [HttpGet("insertintocart")]
    public static void insertIntoCart(int Order_id, int Product_id, int Quantity, int Price) {
        string SQLQuery = "INSERT INTO Carts (Order_id, Product_id, Quantity, Price) VALUES (" + Order_id + ", " + Product_id + ", " + Quantity + ", " + Price + ");";
        makeConnection(SQLQuery);
    }
    [HttpGet("deletefromcart")]
    public static void deleteFromCart(int Purchase_id) {
        string SQLQuery = "DELETE FROM Carts WHERE Purchase_id = " + Purchase_id;
        makeConnection(SQLQuery);
    }
    [HttpGet("updatecarts")]
    public static void updateCarts(int Orderid, int Productid, int Quantity, int Price) {
        string SQLQuery = "UPDATE Carts SET Order_id = " + Orderid + ", Product_id = " + Productid + ", Quantity = " + Quantity + ", Price = " + Price + "WHERE Order_id = " + Orderid + ";";
        makeConnection(SQLQuery);
    }

    //PRODUCT Methods
    [HttpGet("insertproduct")]
    public static void InsertProduct( string name,  int Quantity, int in_stock, int Price) {
        string SQLQuery = "INSERT INTO Products (Product_name, Quantity, In_stock, Price) VALUES ('" + name + "', " + Quantity + ", " + in_stock + ", " + Price + ");";             //add new product to database if admin privileges exist in session
        makeConnection(SQLQuery);
    }
    [HttpGet("removeproduct")]
    public static void removeProduct(string name) {            // remove product from sale if  needs be
        string SQLQuery = "DELETE FROM Products WHERE Product_name =" + name +  ";";            //add new product to database if admin privileges exist in session
        makeConnection(SQLQuery);
    }
    [HttpGet("addproductquantity")]
    public static void addProductQuantity(string name, int plusQuantity) {
        string SQLQuery = "UPDATE Products SET QUANTITY = QUANTITY + " + plusQuantity +  " WHERE Product_name ='" + name +  "';";            //add new product to database if admin privileges exist in session
        makeConnection(SQLQuery);
    }
    [HttpGet("depleteproductquantity")]
    public static void depleteProductQuantity(string name, int minusQuantity) {
        string SQLQuery = "UPDATE Products SET QUANTITY = QUANTITY - " + minusQuantity +  " WHERE Product_name ='" + name +  "';";            //add new product to database if admin privileges exist in session
        makeConnection(SQLQuery);

    }
    [HttpGet("alterproductprice")]
    public static void alterProductPrice(string name, int newPrice) {
        string SQLQuery = "UPDATE Products SET Price = " + newPrice +  " WHERE Product_name ='" + name +  "';";            //add new product to database if admin privileges exist in session
        makeConnection(SQLQuery);
    }

    static int hashAuth(string password){
        int hash = password.GetHashCode();
        return hash;
    }

}
*/