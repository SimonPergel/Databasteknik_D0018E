using System;
using MySql.Data.MySqlClient; // Use MySql.Data for MySQL

class Application {
    static void Main() {
        Console.WriteLine("Connecting to MySQL...");

        // Correct MySQL connection string
        string connectionString = "Server=16.170.225.238;Port=3306;Database=Shop;User Id=foo;Password=hejhej;";
        
        // Connect to MySQL
        using (MySqlConnection connection = new MySqlConnection(connectionString)) {
            try {
                connection.Open();
                Console.WriteLine("Connected to MySQL successfully!");

                // Correct SQL query (ensure 'Erik' is wrapped in single quotes)
                string sqlQuery = "INSERT INTO Users (User_id, role, Shopping_Cart_id, Balance, Account_name) VALUES (5, 'customer', 5, 2000, 'Erik');";
                
                // Execute query
                using (MySqlCommand command = new MySqlCommand(sqlQuery, connection)) {
                    int rowsAffected = command.ExecuteNonQuery();
                    Console.WriteLine($"{rowsAffected} row(s) inserted successfully.");
                }
            } catch (Exception ex) {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }
        }
    }
}
