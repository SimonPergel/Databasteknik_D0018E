namespace WebServer.Models {  
    public class Opinion {
        public int userID { get; set; }
        public int? productID { get; set; }
        public string? comment { get; set; }

        public int? commentID { get; set; }
       
    }
}