using System.Net.Http;
using System.Threading.Tasks;

class App_test {
        static async Task Main(string[] args){
                //create an HTTPClient instance
                HttpClient client = new HttpClient();

                try{
                        //send a GET request to the NODE.js server
                        HttpResponseMessage response = await client.GetAsync("http://localhost:3000/");

                        //Ensure the request was succesfull
                        response.EnsureSuccessStatusCode();

                        // Read and display the respone content
                        string content = await response.Content.ReadAsStringAsync();
                        Console.WriteLine("The Respone from the Node.js server: " + content);
                }
                catch (HttpRequestException e)
                {
                        Console.WriteLine("Reqest failed: " + e.Message);
                }
        }
}


