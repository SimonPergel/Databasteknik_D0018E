using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.Mvc;
using WebServer.Models; 

// Use MySql.Data for MySQL
public static class Globals {
    // Correct MySQL connection string
    public static string connectionString = "Server=16.170.225.238;Port=3306;Database=Shop;User Id=foo;Password=hejhej;";
}

[ApiController]
[Route("api/mycontroller")]
public class MyController : ControllerBase {
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
    public IActionResult InsertUser(string role, int shpcrtid, int balance, string acctname) {

        //http://localhost:5201/api/mycontroller/insertuser?role=admin&shpcrtid=1&balance=1000&acctname=test

        string SQLQuery = "INSERT into Users (role, Shopping_Cart_id, Balance, Account_name) VALUES (" + "'" + role + "'" + ", " + shpcrtid + ", " + balance + ", " + "'" + acctname + "'" +");";
        try {
            makeConnection(SQLQuery);
            var result = new { Message = "User inserted successfully!", role, shpcrtid, balance, acctname };
            return Ok(result);
        } catch (Exception exception) {
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }  
    }

     [HttpGet("running")]

     public IActionResult running(){                //http://localhost:5201/api/mycontroller/running
        var result = new { Message = "WebServer is running"};
            return Ok(result);
     }


    [HttpGet("balanceusermath")]

    public IActionResult balanceUserMath(string acctName, int math) {          //decrease or increase balance based on deposits or purchases
        
        // http://localhost:5201/api/mycontroller/balanceusermath?acctName=test&math=100

        string SQLQuery = "UPDATE Users SET Balance = Balance + " + math + " WHERE Account_name = " + acctName + ";";
        try {
            makeConnection(SQLQuery);
            var result = new { Message = "User balanced changed successfully!", acctName, math};
            return Ok(result);
        } catch (Exception exception) {
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

    [HttpGet("checkadmin")]
    public static void /* bool*/ checkAdmin(char AcctName) {           //check if admin privileges should be granted during session
        string SQLQuery = "SELECT role FROM Users WHERE role = 'admin';";    //NOT FUNCTIONAL YET 
    }

    //ORDER METHODS
    [HttpGet("alterorderstatus")]
    public static void AlterOrderStatus() {            //switches  order status between finished, pending or cancelled

    }

    //CART METHODS

    [HttpGet("insertintocart")]
    public IActionResult insertIntoCart(int orderID, int productID, int quantity, int price) {
        string SQLQuery = "INSERT INTO Carts (Order_id, Product_id, Quantity, Price) VALUES (" + orderID + ", " + productID + ", " + quantity + ", " + price + ");";
        try {
            makeConnection(SQLQuery);
            var result = new { Message = "New cart inserted successfully!", orderID, productID, quantity, price};
            return Ok(result);
        } catch (Exception exception) {
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

    [HttpGet("deletefromcart")]
    public IActionResult deleteFromCart(int purchaseID) {
        string SQLQuery = "DELETE FROM Carts WHERE Purchase_id = " + purchaseID + ";";
        try {
            makeConnection(SQLQuery);
            var result = new { Message = "Cart deleted successfully!", purchaseID};
            return Ok(result);      
        } catch (Exception exception) {
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

    [HttpGet("updatecarts")]
    public IActionResult updateCarts(int orderID, int productID, int quantity, int price) {
        string SQLQuery = "UPDATE Carts SET Order_id = " + orderID + ", Product_id = " + productID + ", Quantity = " + quantity + ", Price = " + price + " WHERE Purchase_id = " + orderID + ";";
        try {
            makeConnection(SQLQuery);
            var result = new { Message = "Cart updated successfully!", orderID, productID, quantity, price };
            return Ok(result);
        } catch (Exception exception) {
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

    //PRODUCT Methods
    [HttpGet("insertproduct")]
    public IActionResult InsertProduct( string name,  int quantity, int inStock, int price) {

        //http://localhost:5201/api/mycontroller/insertproduct?name=product1&quantity=10&inStock=5&price=100

        string SQLQuery = "INSERT INTO Products (Product_name, Quantity, In_stock, Price) VALUES ('" + name + "', " + quantity + ", " + inStock + ", " + price + ");";             //add new product to database if admin privileges exist in session
        try {
            makeConnection(SQLQuery);
            var result = new { Message = "Product inserted successfully!", name, quantity, inStock, price};
            return Ok(result);
        } catch (Exception exception) {
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

     [HttpGet("notForSale")]
    public IActionResult removeProduct(string name) {            // remove product from sale if  needs be
        string SQLQuery = "UPDATE Products SET In_stock = 0 WHERE Product_name = " +name +   ";";            //add new product to database if admin privileges exist in session
        try {
            makeConnection(SQLQuery);
            var result = new { Message = "Product removed from sale successfully!", name};
            return Ok(result);
        } catch (Exception exception) {
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

         [HttpGet("forSale")]
    public IActionResult fororSale(string name) {            // remove product from sale if  needs be
        string SQLQuery = "UPDATE Products SET In_stock = 1 WHERE Product_name = " +name +   ";";            //add new product to database if admin privileges exist in session
        try {
            makeConnection(SQLQuery);
            var result = new { Message = "Product put on sale successfully!", name};
            return Ok(result);
        } catch (Exception exception) {
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

    [HttpGet("removeProduct")]
    public IActionResult notForSale(string name) {            // remove product from sale if  needs be
        string SQLQuery = "DELETE FROM Products WHERE Product_name =" + name +  ";";            //add new product to database if admin privileges exist in session
        try {
            makeConnection(SQLQuery);
            var result = new { Message = "Product removed successfully!", name};
            return Ok(result);
        } catch (Exception exception) {
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

    [HttpGet("addproductquantity")]
    public IActionResult addProductQuantity(string name, int plusQuantity) {
        string SQLQuery = "UPDATE Products SET QUANTITY = QUANTITY + " + plusQuantity +  " WHERE Product_name = " + "'" + name + "'" +  ";";            //add new product to database if admin privileges exist in session
        try {
            makeConnection(SQLQuery);
            var result = new { Message = "Product quantity increased successfully!", name, plusQuantity};
            return Ok(result);
        } catch (Exception exception) {
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

    [HttpGet("depleteproductquantity")]
    public IActionResult depleteProductQuantity(string name, int minusQuantity) {
        string SQLQuery = "UPDATE Products SET QUANTITY = QUANTITY - " + minusQuantity +  " WHERE Product_name ='" + name +  "';";            //add new product to database if admin privileges exist in session
        try {
            makeConnection(SQLQuery);
            var result = new { Message = "Product quantity decreased successfully!", name, minusQuantity};
            return Ok(result);
        } catch (Exception exception) {
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }

    [HttpGet("alterproductprice")]
    public IActionResult alterProductPrice(string name, int newPrice) {
        string SQLQuery = "UPDATE Products SET Price = " + newPrice +  " WHERE Product_name ='" + name +  "';";            //add new product to database if admin privileges exist in session
        try {
            makeConnection(SQLQuery);
            var result = new { Message = "Product price updated successfully!", name, newPrice};
            return Ok(result);
        } catch (Exception exception) {
            var result = new { Message = exception.Message};
            return BadRequest(result);
        }
    }


/////////////////UGLINESS AHEAD /////////////////////////////////////7

[HttpGet("getproductsadmin")]
public IActionResult GetProducts() {

    string SQLQuery = "SELECT * FROM Products;"; // Retrieve all products
    try {
        List<Product> products = new List<Product>();

        // Open the connection to the database
        using (MySqlConnection connection = new MySqlConnection(Globals.connectionString)) {
            connection.Open();
            using (MySqlCommand command = new MySqlCommand(SQLQuery, connection)) {
                using (MySqlDataReader reader = command.ExecuteReader()) {
                    while (reader.Read()) {
                        // Read each row and map to a Product object
                        products.Add(new Product {
                            Id = reader.GetInt32("Product_id"), // Assuming column name 'Product_id'
                            Name = reader.GetString("Product_name"),
                            Quantity = reader.GetInt32("Quantity"),
                            InStock = reader.GetInt32("In_stock"),
                            Price = reader.GetInt32("Price")
                        });
                    }
                }
            }
        }

        // Return the retrieved products as JSON
        return Ok(products);
    } catch (Exception exception) {
        var result = new { Message = exception.Message };
        return BadRequest(result);
    }
}

[HttpGet("getproductsuser")]
public IActionResult GetProductsUser() {

    string SQLQuery = "SELECT * FROM Products WHERE In_Stock = 1;"; // Retrieve all products
    try {
        List<Product> products = new List<Product>();

        // Open the connection to the database
        using (MySqlConnection connection = new MySqlConnection(Globals.connectionString)) {
            connection.Open();
            using (MySqlCommand command = new MySqlCommand(SQLQuery, connection)) {
                using (MySqlDataReader reader = command.ExecuteReader()) {
                    while (reader.Read()) {
                        // Read each row and map to a Product object
                        products.Add(new Product {
                            Id = reader.GetInt32("Product_id"), // Assuming column name 'Product_id'
                            Name = reader.GetString("Product_name"),
                            Quantity = reader.GetInt32("Quantity"),
                            InStock = reader.GetInt32("In_stock"),
                            Price = reader.GetInt32("Price")
                        });
                    }
                }
            }
        }

        // Return the retrieved products as JSON
        return Ok(products);
    } catch (Exception exception) {
        var result = new { Message = exception.Message };
        return BadRequest(result);
    }
}





}
