using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(); // Enables API controllers
var app = builder.Build();

app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
app.UseRouting();
app.UseAuthorization();
app.MapControllers(); // Maps controllers to endpoints

app.Urls.Add("http://0.0.0.0:5201");

// Log the listening URLs
Console.WriteLine($"API is running on: {string.Join(", ", app.Urls)}");

// Start the app
app.Run();