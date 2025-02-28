// Create a new file called Product.cs
namespace WebServer.Models {  // Adjust the namespace if needed to match your project structure
    public class Product {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? Quantity { get; set; }
        public int? InStock { get; set; }
        public int? Price { get; set; }
    }

    public class Admin {
        public string? accountName { get; set; }
    }

    public class Cart {
        public int cartID { get; set; }
        public int productID { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }
        public int purchaseID { get; set; }
    }

    public class CheckoutRequest {
        public int cartId { get; set; }
        public int productID { get; set; }
    }

    public class ProductDepletionRequest {
        public int ProductID { get; set; }
        public int MinusQuantity { get; set; }

        public ProductDepletionRequest(int productID, int minusQuantity) {
            ProductID = productID;
            MinusQuantity = minusQuantity;
        }
    }

    public class Authentication {
        public int id { get; set; }
        public string? username { get; set; }
        public string? password { get; set; }
        public string? email { get; set; }
    }
}
