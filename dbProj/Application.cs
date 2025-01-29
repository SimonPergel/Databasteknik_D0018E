using System.Net;
using MySql.Data.MySqlClient;
using Microsoft.JSInterop;
 // Use MySql.Data for MySQL

public static class Globals {
    // Correct MySQL connection string
    public static string connectionString = "Server=16.170.225.238;Port=3306;Database=Shop;User Id=foo;Password=hejhej;";
}

class Application {
    static void Main() {
        insertIntoCart(1, 2, 9, 16);
        //updateCarts(2, 2, 7, 20);
    }

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

    [JS]
    static void insertIntoCart(int Order_id, int Product_id, int Quantity, int Price) {
        string SQLQuery = "INSERT INTO Carts (Order_id, Product_id, Quantity, Price) VALUES (" + Order_id + ", " + Product_id + ", " + Quantity + ", " + Price + ");";
        makeConnection(SQLQuery);
    }
    static void deleteFromCart(int Purchase_id) {
        string SQLQuery = "DELETE FROM Carts WHERE Purchase_id = " + Purchase_id;
        makeConnection(SQLQuery);
    }
    static void updateCarts(int Order_id, int Product_id, int Quantity, int Price) {
        string SQLQuery = "UPDATE Carts SET Order_id = " + Order_id + ", Product_id = " + Product_id + ", Quantity = " + Quantity + ", Price = " + Price + "WHERE Order_id = " + Order_id + ";";
        makeConnection(SQLQuery);
    }
}
