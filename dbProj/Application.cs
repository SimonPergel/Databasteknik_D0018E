using System;
using System.Data.SqlClient;

public class Application 
{
    public static void Main() 
    {
        Console.WriteLine("Hello");
        string connectionString = "Server=16.170.225.238;Database=Shop;User Id=foo;Password=hejhej";
        using (SqlConnection connection = new SqlConnection(connectionString)) 
        {
            connection.Open(); 

            string sqlQuery = "INSERT INTO Users (User_id, role, Shopping_Cart_id, Balance, Account_name) " +
                              "VALUES (5, 'customer', 5, 2000, 'Erik');"; 

            using (SqlCommand command = new SqlCommand(sqlQuery, connection)) 
            {
                command.ExecuteNonQuery(); 
            }
        }
    }
}
