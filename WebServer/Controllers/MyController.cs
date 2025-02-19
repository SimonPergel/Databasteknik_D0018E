using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.Mvc;
using WebServer.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;

// Use MySql.Data for MySQL
public static class Globals {
    public static string connectionString = "Server=16.170.225.238;Port=3306;Database=Shop;User Id=foo;Password=hejhej;";   // Correct MySQL connection string.
}

[ApiController]                 // Create a API Controller.
[Route("api/mycontroller")]     // Define the route to the API Controller, the subpath has to have the same name as name of class.
public class MyController : ControllerBase {
    [HttpGet("makeconnection")]
    static void makeConnection(string SQLQuery) {                                               
        Console.WriteLine("Connecting to MySQL...");
        using (MySqlConnection connection = new MySqlConnection(Globals.connectionString)) {    // Creates a connection with the connection string.
            try {
                connection.Open();
                Console.WriteLine("Connected to MySQL successfully!");           
                using (MySqlCommand command = new MySqlCommand(SQLQuery, connection)) {         // Creates the SQL command based on the SQLQuery.
                    int rowsAffected = command.ExecuteNonQuery();                               // Executes the SQLQuery.
                    Console.WriteLine($"{rowsAffected} row(s) inserted successfully.");         // Writes in Console how many rows in the table got affected.
                }
            } catch (Exception exception) {                                                     // Catches an exception and writes the exception message in the Console.
                Console.WriteLine($"An error occurred: {exception.Message}");
            }
        }
    }

    static (MySqlConnection, MySqlDataReader) StartReader(string SQLQuery) {
        MySqlConnection connection = new MySqlConnection(Globals.connectionString); // Makes a new connection to the database.
        connection.Open();
        MySqlCommand command = new MySqlCommand(SQLQuery, connection);              // Makes the command that should be executed on the database.
        MySqlDataReader reader = command.ExecuteReader();                           // Executes the command via the reader.
        return (connection, reader);                                                // Returns the reader so the calling method can handle variables separately, returns the connection so it can be closed.
    }

    //USER METHODS

    [HttpGet("insertuser")]
    public IActionResult InsertUser(string role, int shpcrtid, int balance, string acctname) { // Inserts a new user into the User table. Define role, shopping cart id, balance and account name.
        // http://localhost:5201/api/mycontroller/insertuser?role=admin&shpcrtid=1&balance=1000&acctname=test
        string SQLQuery = "INSERT into Users (role, Shopping_Cart_id, Balance, Account_name) VALUES (" + "'" + role + "'" + ", " + shpcrtid + ", " + balance + ", " + "'" + acctname + "'" +");";
        try {
            makeConnection(SQLQuery);                                                                           // Makes the connection to the database and runs the SQLQuery.
            var result = new { Message = "User inserted successfully!", role, shpcrtid, balance, acctname };    // TODO: Make better return message.
            return Ok(result);                                                                                  // Returns a OK with a result message.
        } catch (Exception exception) {                                                                         // Catches an exception and returns the exception message.
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }  
    }

     [HttpGet("running")]
     public IActionResult running(){                            // http://localhost:5201/api/mycontroller/running
        var result = new { Message = "WebServer is running"};   // Check if the web server is running.
            return Ok(result);
     }


    [HttpGet("balanceusermath")]
    public IActionResult balanceUserMath(string acctName, int math) { // Decrease or increase balance based on deposits or purchases. Define account name and +/- value.
        // http://localhost:5201/api/mycontroller/balanceusermath?acctName=test&math=100
        string SQLQuery = "UPDATE Users SET Balance = Balance + " + math + " WHERE Account_name = " + "'" + acctName + "';";
        try {
            makeConnection(SQLQuery);                                                               // Makes the connection to the database and runs the SQLQuery.
            var result = new { Message = "User balanced changed successfully!", acctName, math};    // TODO: Make better return message.
            return Ok(result);                                                                      // Returns a OK with a result message.
        } catch (Exception exception) {                                                             // Catches an exception and returns the exception message.
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

    [HttpGet("checkadmin")]
    public IActionResult CheckAdmin(string AcctName) { // Check if admin privileges should be granted during session. Define account name.
    // http://localhost:5201/api/mycontroller/checkadmin?acctname=Alice
        string SQLQuery = "SELECT Account_name FROM Users WHERE role = 'admin';";
        try {
            List<Admin> users = new List<Admin>();
            var (connection, reader) = StartReader(SQLQuery);                               // Makes a connection to the database and starts a reader.
            while (reader.Read()) {                                                         // Read each row and map to the User object.
                users.Add(new Admin {
                    accountName = reader.GetString("Account_name"),                         // Reads in the account name into the Admin list
                });
            }
            reader.Close();                                                                 // Closes the reader.
            connection.Close();                                                             // Closes the connection to the database.
            if (users.Exists(x => x.accountName == AcctName)) {
                var goodresult = new { Message = "This account is an admin:", AcctName};    // Returns a message that says the requested account is an admin.
                return Ok(goodresult);
            }
            var badresult = new { Message = "This account is not an admin:", AcctName};     // Returns a message when requested account is not an admin.
            return Ok(badresult);                                   
        } catch (Exception exception) {                                                     // Catches an exception and returns the exception message.
            var result = new { Message = exception.Message };   
            return BadRequest(result);
        }
    }

    //ORDER METHODS

    [HttpGet("alterorderstatus")]
    public static void AlterOrderStatus() { // Switches order status between finished, pending or cancelled.
    }

    //CART METHODS

    [HttpGet("insertintocart")]
    public IActionResult insertIntoCart(int orderID, int productID, int quantity, int price) { // Inserts a new cart into the Cart table. Define order id, product id, quantity and price.
    // http://localhost:5201/api/mycontroller/insertintocart?orderID=1&productID=2&quantity=20&price=15
        string SQLQuery = "INSERT INTO Carts (Order_id, Product_id, Quantity, Price) VALUES (" + orderID + ", " + productID + ", " + quantity + ", " + price + ");";
        try {
            makeConnection(SQLQuery);                                                                               // Makes the connection to the database and runs the SQLQuery.
            var result = new { Message = "New cart inserted successfully!", orderID, productID, quantity, price};   // TODO: Make better return message.
            return Ok(result);                                                                                      // Returns a OK with a result message.
        } catch (Exception exception) {                                                                             // Catches an exception and returns the exception message.
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

    [HttpGet("deletefromcart")]
    public IActionResult deleteFromCart(int purchaseID) { // Removes a cart from the Cart table. Define purchase id.
    // http://localhost:5201/api/mycontroller/deletefromcart?purchaseID=1
        string SQLQuery = "DELETE FROM Carts WHERE Purchase_id = " + purchaseID + ";";
        try {
            makeConnection(SQLQuery);                                                   // Makes the connection to the database and runs the SQLQuery.
            var result = new { Message = "Cart deleted successfully!", purchaseID};     // TODO: Make better return message.
            return Ok(result);                                                          // Returns a OK with a result message.
        } catch (Exception exception) {                                                 // Catches an exception and returns the exception message.
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

    [HttpGet("updatecarts")]
    public IActionResult updateCarts(int orderID, int productID, int quantity, int price) { // Updates a cart in the Cart table, define order id, product id, quantity and price.
    // http://localhost:5201/api/mycontroller/updatecarts?orderID=1&productID=2&quantity=14&price=7
        string SQLQuery = "UPDATE Carts SET Order_id = " + orderID + ", Product_id = " + productID + ", Quantity = " + quantity + ", Price = " + price + " WHERE Purchase_id = " + orderID + ";";
        try {
            makeConnection(SQLQuery);                                                                           // Makes the connection to the database and runs the SQLQuery.
            var result = new { Message = "Cart updated successfully!", orderID, productID, quantity, price };   // TODO: Make better return message.
            return Ok(result);                                                                                  // Returns a OK with a result message.
        } catch (Exception exception) {                                                                         // Catches an exception and returns the exception message.
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

    //PRODUCT Methods

   /* [HttpGet("insertproduct")]
   public IActionResult InsertProduct( string name,  int quantity, int inStock, int price) { // Insert a product into the Product table. Define name, quantity, in stock and price.
        // http://localhost:5201/api/mycontroller/insertproduct?name=product1&quantity=10&inStock=5&price=100
        string SQLQuery = "INSERT INTO Products (Product_name, Quantity, In_stock, Price) VALUES ('" + name + "', " + quantity + ", " + inStock + ", " + price + ");";
        try {
            makeConnection(SQLQuery);                                                                           // Makes the connection to the database and runs the SQLQuery.
            var result = new { Message = "Product inserted successfully!", name, quantity, inStock, price};     // TODO: Make better return message.
            return Ok(result);                                                                                  // Returns a OK with a result message.
        } catch (Exception exception) {                                                                         // Catches an exception and returns the exception message.
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }
*/
public class Product {
    public int Id { get; set; }
    public string Name { get; set; }
    public int Quantity { get; set; }
    public int InStock { get; set; }
    public decimal Price { get; set; }
}

[HttpPut("insertproduct")]
public IActionResult InsertProduct([FromBody] Product product) {
    if (product == null || product.Name == null || product.Quantity == null || product.InStock == null || product.Price == null) {
        Console.WriteLine("Invalid product data.");
        return BadRequest(new { Message = "Invalid product data." });
    }

    string SQLQuery = "INSERT INTO Products (Product_name, Quantity, In_stock, Price) VALUES (@name, @quantity, @inStock, @price)";
   Console.WriteLine(product.Name + product.Quantity + product.InStock + product.Price);
    Console.WriteLine("oogabooga");
    try {
        Console.WriteLine($" row(s) inserted?");
        using (var connection = new MySqlConnection(Globals.connectionString))
        {
            Console.WriteLine($" row(s) inserted?");
            connection.Open();
            using (var command = new MySqlCommand(SQLQuery, connection))
            {
                 Console.WriteLine($" row(s) inserted?");
                command.Parameters.AddWithValue("@name", (string)product.Name);
                command.Parameters.AddWithValue("@quantity", (int)product.Quantity);
                command.Parameters.AddWithValue("@inStock", (int)product.InStock);
                command.Parameters.AddWithValue("@price", (int)product.Price);

                int rowsAffected = command.ExecuteNonQuery();
                Console.WriteLine($"{rowsAffected} row(s) inserted?");
                if (rowsAffected > 0)
                {
                    var result = new { Message = "Product inserted successfully!", product.Name, product.Quantity, product.InStock, product.Price };
                    return Ok(result);
                }
                else
                {
                    return BadRequest(new { Message = "No rows inserted. Check data validity." });
                }
            }
        }
    } catch (Exception exception) {
        return BadRequest(new { Message = exception.Message });
    }
}


    [HttpGet("notforsale")]
    public IActionResult removeProduct(string name) { // Removes a product from the Product table. Define name.
    // http://localhost:5201/api/mycontroller/notforsale?name=Pencil
        string SQLQuery = "UPDATE Products SET In_stock = 0 WHERE Product_name = " + "'" + name + "';";
        try {
            makeConnection(SQLQuery);                                                       // Makes the connection to the database and runs the SQLQuery.
            var result = new { Message = "Product removed from sale successfully!", name};  // TODO: Make better return message.
            return Ok(result);                                                              // Returns a OK with a result message.
        } catch (Exception exception) {                                                     // Catches an exception and returns the exception message.
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

    [HttpGet("updateproductname")]
    public IActionResult UpdateProductName(string newName, string oldName) { // Updates a product name in the Product table. Define the new name and the old name.
    // http://localhost:5201/api/mycontroller/updateproductname?newname=Eraser&oldname=Eraser1
        string SQLQuery = "UPDATE Products SET Product_name = " + "'" + newName + "'" + "WHERE Product_name = " + "'" + oldName + "';";
        try {
            makeConnection(SQLQuery);                                                       // Makes the connection to the database and runs the SQLQuery.
            var result = new { Message = "Product name updated successfully!", newName};    // TODO: Make better return message.
            return Ok(result);                                                              // Returns a OK with a result message.
        } catch (Exception exception) {                                                     // Catches an exception and returns the exception message.
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

    [HttpGet("forsale")]
    public IActionResult forSale(string name) { // Update a product in the Product table to be in stock. Define name.
    // http://localhost:5201/api/mycontroller/forsale?name=Pencil
        string SQLQuery = "UPDATE Products SET In_stock = 1 WHERE Product_name = " + "'" + name + "';";
        try {
            makeConnection(SQLQuery);                                                   // Makes the connection to the database and runs the SQLQuery.
            var result = new { Message = "Product put on sale successfully!", name};    // TODO: Make better return message.
            return Ok(result);                                                          // Returns a OK with a result message.
        } catch (Exception exception) {                                                 // Catches an exception and returns the exception message.
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

    [HttpGet("removeproduct")]
    public IActionResult notForSale(string name) { // Removes a product in the Product table. Define name.
    // http://localhost:5201/api/mycontroller/removeproduct?name=Pencil
        string SQLQuery = "DELETE FROM Products WHERE Product_name = " + "'" + name +  "';";
        try {
            makeConnection(SQLQuery);                                               // Makes the connection to the database and runs the SQLQuery.
            var result = new { Message = "Product removed successfully!", name};    // TODO: Make better return message.
            return Ok(result);                                                      // Returns a OK with a result message.
        } catch (Exception exception) {                                             // Catches an exception and returns the exception message.
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

    [HttpGet("addproductquantity")]
    public IActionResult addProductQuantity(string name, int plusQuantity) { // Updates a product in the Product table to add quantity. Define name and added quantity.
    // http://localhost:5201/api/mycontroller/addproductquantity?name=Pencil&plusQuantity=10
        string SQLQuery = "UPDATE Products SET QUANTITY = QUANTITY + " + plusQuantity +  " WHERE Product_name = " + "'" + name + "';";
        try {
            makeConnection(SQLQuery);                                                                       // Makes the connection to the database and runs the SQLQuery.
            var result = new { Message = "Product quantity increased successfully!", name, plusQuantity};   // TODO: Make better return message.
            return Ok(result);                                                                              // Returns a OK with a result message.
        } catch (Exception exception) {                                                                     // Catches an exception and returns the exception message.
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

    [HttpGet("depleteproductquantity")]
    public IActionResult depleteProductQuantity(string name, int minusQuantity) { // Updates a product in the Product table to decrease quantity. Define name and decreased quantity.
    // http://localhost:5201/api/mycontroller/depleteproductquantity?name=Pencil&minusQuantity=10
        string SQLQuery = "UPDATE Products SET QUANTITY = QUANTITY - " + minusQuantity +  " WHERE Product_name = " + "'" + name + "';";
        try {
            makeConnection(SQLQuery);                                                                       // Makes the connection to the database and runs the SQLQuery.
            var result = new { Message = "Product quantity decreased successfully!", name, minusQuantity};  // TODO: Make better return message.
            return Ok(result);                                                                              // Returns a OK with a result message.
        } catch (Exception exception) {                                                                     // Catches an exception and returns the exception message.
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

    [HttpGet("alterproductprice")]
    public IActionResult alterProductPrice(string name, int newPrice) { // Updates a product in the Product table to change its price. Define name and new price.
    // http://localhost:5201/api/mycontroller/alterproductprice?name=Pencil&newPrice=15
        string SQLQuery = "UPDATE Products SET Price = " + newPrice +  " WHERE Product_name = " + "'" + name +  "';";
        try {
            makeConnection(SQLQuery);                                                               // Makes the connection to the database and runs the SQLQuery.
            var result = new { Message = "Product price updated successfully!", name, newPrice};    // TODO: Make better return message.
            return Ok(result);                                                                      // Returns a OK with a result message.
        } catch (Exception exception) {                                                             // Catches an exception and returns the exception message.
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

    // SELECT methods

    [HttpGet("getproductsadmin")]
    public IActionResult GetProducts() { // This retrieves all products regardless of in stock or not.
    // http://localhost:5201/api/mycontroller/getproductsadmin
        string SQLQuery = "SELECT * FROM Products;";
        try {
            List<Product> products = new List<Product>();       // Create a product object as a list for the reader to input to.
            var (connection, reader) = StartReader(SQLQuery);   // Makes a connection to the database and starts a reader.
            while (reader.Read()) {                             // Read each row and map to the Product object.
                products.Add(new Product {
                    Id = reader.GetInt32("Product_id"),         // Assuming column name 'Product_id'.
                    Name = reader.GetString("Product_name"),
                    Quantity = reader.GetInt32("Quantity"),
                    InStock = reader.GetInt32("In_stock"),
                    Price = reader.GetInt32("Price")
                });
            }
            reader.Close();                                     // Closes the reader.
            connection.Close();                                 // Closes the connection to the database.
        return Ok(products);                                    // Returns the retrieved products as JSON.
        } catch (Exception exception) {                         // Catches an exception and returns the exception message.
            var result = new { Message = exception.Message };   
            return BadRequest(result);
        }
    }

    [HttpGet("getproductsuser")]
    public IActionResult GetProductsUser() { // This retrieves all products in stock.
    // http://localhost:5201/api/mycontroller/getproductsuser
        string SQLQuery = "SELECT * FROM Products WHERE In_Stock = 1;";
        try {
            List<Product> products = new List<Product>();               // Create a product object as a list for the reader to input to.
            var (connection, reader) = StartReader(SQLQuery);           // Makes a connection to the database and starts a reader.
            while (reader.Read()) {                                     // Read each row and map to the Product object.
                products.Add(new Product {
                    Id = reader.GetInt32("Product_id"),                 // Assuming column name 'Product_id'.
                    Name = reader.GetString("Product_name"),
                    Quantity = reader.GetInt32("Quantity"),
                    InStock = reader.GetInt32("In_stock"),
                    Price = reader.GetInt32("Price")
                });
            }
            reader.Close();                                             // Closes the reader.
            connection.Close();                                         // Closes the connection to the database.
            return Ok(products);                                        // Returns the retrieved products as JSON.
        } catch (Exception exception) {                                 // Catches an exception and returns the exception message.
            var result = new { Message = exception.Message };
            return BadRequest(result);
        }
    }
}