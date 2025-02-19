// Create a new file called Product.cs
namespace WebServer.Models {  // Adjust the namespace if needed to match your project structure
    public class Product {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Quantity { get; set; }
        public int InStock { get; set; }
        public int Price { get; set; }
    }

        public class Admin {
        public string? accountName { get; set; }
    }
}
