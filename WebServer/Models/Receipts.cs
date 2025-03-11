namespace WebServer.Models {  
    public class Receipts {
        public int checkout_id{ get; set; }
        public int? total_price { get; set; }
        public int? cart_id { get; set; }

        public string? purchasedGoods { get; set; }
       
    }
}