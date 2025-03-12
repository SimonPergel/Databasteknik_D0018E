namespace WebServer.Models {  // Adjust the namespace if needed to match your project structure
    public class Comment {
        public int userID { get; set; }
        public int? productID { get; set; }
        public string? comment { get; set; }

        public int? commentID { get; set; }


    }
}