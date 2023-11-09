using demo_0.Application;
using demo_0.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
//using System.Web.Optimization;

namespace demo_0;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllersWithViews();

        // Add database connection
        builder.Services.AddDbContext<MoviesDbContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("Movies")));

        builder.Services.AddScoped<IUserApplication, UserApplication>();
        builder.Services.AddScoped<IMovieApplication, MovieApplication>();

        //builder.Services.AddHttpClient();

        builder.Services.AddHttpClient("movies", HttpClient =>
        {
            HttpClient.BaseAddress = new Uri("https://localhost:44330/api/");
        });



        var storageUrl = builder.Configuration.GetValue<String>("StorageUrl");

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {
            app.UseExceptionHandler("/Home/Error");
        }
        app.UseStaticFiles();

        app.UseRouting();

        app.UseAuthorization();

        //app.MapControllerRoute(
        //    name: "default",
        //    pattern: "{controller=Home}/{action=Index}/{id?}");

        
        app.MapControllerRoute(
          name: "default",
          pattern: "{controller=Movies}/{action=Index}/{id?}");

        app.Run();
    }
}

