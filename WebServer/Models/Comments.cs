namespace WebServer.Models {  // Adjust the namespace if needed to match your project structure
    public class Opinion {
        public int userID { get; set; }
        public int? productID { get; set; }
        public string? comment { get; set; }
       
    }
}