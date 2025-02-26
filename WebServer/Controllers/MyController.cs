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
        Console.WriteLine("Connecting to MySQL...");
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



[HttpGet("isProductSoldOut")]
public bool isProductSoldOut( int cartID, int productID){ 
    try 
    {
        string SQLQuery = "SELECT COUNT(*) FROM Carts WHERE Cart_id ="+ cartID + " AND Product_id = " + productID + ";";
        using (var connection = new MySqlConnection(Globals.connectionString))
        {
            connection.Open();
            using (var command = new MySqlCommand(SQLQuery, connection))
            {
                command.Parameters.AddWithValue("@CartID", cartID);
                int count = Convert.ToInt32(command.ExecuteScalar());

                if (count == 0)
                {
                    return true;
                }
                return false;
            }
        }
    } 
    catch (Exception exception) 
    {
        return false;
    }
}



    [HttpGet("insertintocart")]
    public IActionResult insertIntoCart(int cartID, int productID, int quantity, int price) { // Inserts a new cart into the Cart table. Define order id, product id, quantity and price.
    // http://localhost:5201/api/mycontroller/insertintocart?cartID=1&productID=2&quantity=20&price=15
        string SQLQuery = "INSERT INTO Carts (Cart_id, Product_id, Quantity, Price) VALUES (" + cartID + ", " + productID + ", " + quantity + ", " + price + ");";
        try {
            makeConnection(SQLQuery);                                                                               // Makes the connection to the database and runs the SQLQuery.
            var result = new { Message = "New cart inserted successfully!", cartID, productID, quantity, price};    // TODO: Make better return message.
            return Ok(result);                                                                                      // Returns a OK with a result message.
        } catch (Exception exception) {                                                                             // Catches an exception and returns the exception message.
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

    [HttpGet("cartCheckout")]
    public IActionResult cartCheckout(int userID, int totalPrice, string purchasedGoods) { // SQL query to delete one specific item from the cart
    // sql query add to checkout table


    string SQLQuery = "INSERT INTO Checkout (Total_price, userID, purchasedGoods);Values (" + totalPrice + ", " + userID + ", " + purchasedGoods + ");";
        try {
            makeConnection(SQLQuery);                                             // Makes the connection to the database and runs the SQLQuery.
            var result = new { Message = "receipt added to history!", userID};    // TODO: Make better return message.
            return Ok(result);
        } catch (Exception exception) {
            return BadRequest(new { Message = "Error processing checkout", Error = exception.Message });
        }
    }


    [HttpGet("deletefromcart")]
    public IActionResult deleteFromCart(int purchaseID) { // Removes a cart from the Cart table. Define purchase id.
    // http://localhost:5201/api/mycontroller/deletefromcart?purchaseID=1
        Console.WriteLine("deleteFromCart method is reached...");
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
    public IActionResult updateCarts(int cartID, int productID, int quantity, int price) { // Updates a cart in the Cart table, define order id, product id, quantity and price.
    // http://localhost:5201/api/mycontroller/updatecarts?orderID=1&productID=2&quantity=14&price=7
        string SQLQuery = "UPDATE Carts SET Cart_id = " + cartID + ", Product_id = " + productID + ", Quantity = " + quantity + ", Price = " + price + " WHERE Purchase_id = " + cartID + ";";
        try {
            makeConnection(SQLQuery);                                                                           // Makes the connection to the database and runs the SQLQuery.
            var result = new { Message = "Cart updated successfully!", cartID, productID, quantity, price };   // TODO: Make better return message.
            return Ok(result);                                                                                  // Returns a OK with a result message.
        } catch (Exception exception) {                                                                         // Catches an exception and returns the exception message.
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

    //PRODUCT Methods

    [HttpGet("insertproduct")]
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

/*
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
*/


    [HttpGet("notforsale")] // no put route made
    public IActionResult removeProduct(string name) { // Removes a product from the Product table. Define name. // http://localhost:5201/api/mycontroller/notforsale?name=Pencil
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

    [HttpGet("forsale")]    // no put route made
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

    [HttpGet("removeproduct")]  // no put route made
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

    [HttpGet("addproductquantity")]  //no  put Route made
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

    [HttpGet("depleteStockQuantity")]
    public IActionResult DepleteStockQuantity(int productID, int MinusQuantity) {
        Console.WriteLine("productId= " + productID+ " ,MinusQuantity =" + MinusQuantity);  // Updates a product in the Product table to decrease quantity.
        Console.WriteLine("Depleting stock quantity");
        string SQLQuery = "UPDATE Products SET Quantity = Quantity - " + MinusQuantity + 
                      " WHERE Product_id = " + productID + " ;";
        try {
            makeConnection(SQLQuery);  // Makes the connection to the database and runs the SQLQuery.
            var result = new { Message = "Product quantity decreased successfully!", productID, MinusQuantity };
            return Ok(result);  // Returns an OK with a result message.
        } catch (Exception exception) { // Catches an exception and returns the exception message.
            Console.WriteLine("tried Deleting nonexistent item");
            var result = new { Message = exception.Message };
            return BadRequest(result);
        }
    }

    [HttpGet("alterproductprice")] //no put route made
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

/////////////////////////////////////////////////////////// SELECT methods

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

    [HttpGet("running")]
     public IActionResult running(){                            // http://localhost:5201/api/mycontroller/running
        var result = new { Message = "WebServer is running"};   // Check if the web server is running.
            return Ok(result);
     }

    [HttpGet("getcarts")]
    public IActionResult GetCarts(int productid) { // This retrieves all products in stock.
    // http://localhost:5201/api/mycontroller/getcarts?productid=5
        Console.WriteLine("getCarts function is reached");
        string SQLQuery = "SELECT * FROM Carts WHERE Product_id = " + productid + ";";
        try {
            List<Cart> carts = new List<Cart>();               // Create a product object as a list for the reader to input to.
            var (connection, reader) = StartReader(SQLQuery);           // Makes a connection to the database and starts a reader.
            while (reader.Read()) {                                     // Read each row and map to the Product object.
                carts.Add(new Cart {
                    cartID = reader.GetInt32("Cart_id"),                 // Assuming column name 'Product_id'.
                    productID = reader.GetInt32("Product_id"),
                    Quantity = reader.GetInt32("Quantity"),
                    Price = reader.GetInt32("Price"),
                    purchaseID = reader.GetInt32("Purchase_id")
                });
            }
            reader.Close();                                             // Closes the reader.
            connection.Close();                                         // Closes the connection to the database.
            return Ok(carts);                                           // Returns the retrieved products as JSON.
        } catch (Exception exception) {                                 // Catches an exception and returns the exception message.
            var result = new { Message = exception.Message };
            return BadRequest(result);
        }
    }


[HttpGet("CheckProductAvailability")]
public bool CheckProductAvailability(int productID, int desiredQuantity)
{
    //http://localhost:5201/api/mycontroller/checkproductavailability?productid=5&desiredQuantity=1
    try
    {
        string SQLQuery = "SELECT Quantity FROM Products WHERE Product_id = @ProductID;";

        using (var connection = new MySqlConnection(Globals.connectionString))
        {
            connection.Open();
            using (var command = new MySqlCommand(SQLQuery, connection))
            {
                command.Parameters.AddWithValue("@ProductID", productID);

                object result = command.ExecuteScalar();

                if (result != null && int.TryParse(result.ToString(), out int availableQuantity))
                {
                    return availableQuantity >= desiredQuantity;
                }
            }
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine("Error checking product availability: " + ex.Message);
    }

    return false; // Return false if an error occurs or the product is not found
}

}