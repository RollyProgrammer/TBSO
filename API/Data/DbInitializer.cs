using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    /// <summary>
    /// Handles initialization and seeding of the application's database.
    /// Seeds default users and products when the database is first created.
    /// </summary>
    public class DbInitializer
    {
        /// <summary>
        /// Initializes the database when the application starts.
        /// Ensures that the database is created, migrations are applied,
        /// and seed data (default users and products) are inserted if needed.
        /// </summary>
        /// <param name="app">The current web application instance.</param>
        public static async Task InitDb(WebApplication app)
        {
            using var scope = app.Services.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<StoreContext>()
                ?? throw new InvalidOperationException("Failed to retrieve Store Context.");
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>()
                ?? throw new InvalidOperationException("Failed to retrieve user manager.");

            await SeedData(context, userManager);
        }

        /// <summary>
        /// Applies migrations and seeds default users and products
        /// if the database is empty.
        /// </summary>
        /// <param name="context">The EF Core database context.</param>
        /// <param name="userManager">The user manager for handling user creation and roles.</param>
        private static async Task SeedData(StoreContext context, UserManager<User> userManager)
        {
            // Ensure database is up-to-date with latest migrations
            context.Database.Migrate();

            // Seed default users if no users exist
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "bob@test.com",
                    Email = "bob@test.com"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin@test.com",
                    Email = "admin@test.com"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, ["Member", "Admin"]);
            }

            // Exit early if products are already seeded
            if (context.Products.Any()) return;

            // List of sample products for the store
            var products = new List<Product>
            {
                new()
                {
                    Name = "Angular Speedster Board 2000",
                    Description = "High-performance Angular skateboard built for speed and stability.",
                    Price = 20000,
                    PictureUrl = "/images/products/sb-ang1.png",
                    Brand = "Angular",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new()
                {
                    Name = "Green Angular Board 3000",
                    Description = "Lightweight, eco-friendly skateboard designed for Angular enthusiasts.",
                    Price = 15000,
                    PictureUrl = "/images/products/sb-ang2.png",
                    Brand = "Angular",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new()
                {
                    Name = "Core Board Speed Rush 3",
                    Description = "Streamlined NetCore board built for balance, control, and speed.",
                    Price = 18000,
                    PictureUrl = "/images/products/sb-core1.png",
                    Brand = "NetCore",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new()
                {
                    Name = "Net Core Super Board",
                    Description = "Premium NetCore board with advanced grip and aerodynamic design.",
                    Price = 30000,
                    PictureUrl = "/images/products/sb-core2.png",
                    Brand = "NetCore",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new()
                {
                    Name = "React Board Super Whizzy Fast",
                    Description = "Built for React developers who like to move fast and break limits.",
                    Price = 25000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "React",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new()
                {
                    Name = "Typescript Entry Board",
                    Description = "Smooth, beginner-friendly board for learning tricks safely.",
                    Price = 12000,
                    PictureUrl = "/images/products/sb-ts1.png",
                    Brand = "TypeScript",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new()
                {
                    Name = "Core Blue Hat",
                    Description = "Cool blue hat with a soft cotton finish — perfect for NetCore devs.",
                    Price = 1000,
                    PictureUrl = "/images/products/hat-core1.png",
                    Brand = "NetCore",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new()
                {
                    Name = "Green React Woolen Hat",
                    Description = "Warm and stylish woolen hat for React enthusiasts.",
                    Price = 8000,
                    PictureUrl = "/images/products/hat-react1.png",
                    Brand = "React",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new()
                {
                    Name = "Purple React Woolen Hat",
                    Description = "Soft purple wool hat, ideal for chilly coding sessions.",
                    Price = 1500,
                    PictureUrl = "/images/products/hat-react2.png",
                    Brand = "React",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new()
                {
                    Name = "Blue Code Gloves",
                    Description = "Comfortable gloves for long programming hours.",
                    Price = 1800,
                    PictureUrl = "/images/products/glove-code1.png",
                    Brand = "VS Code",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new()
                {
                    Name = "Green Code Gloves",
                    Description = "Keep your hands warm while debugging your code.",
                    Price = 1500,
                    PictureUrl = "/images/products/glove-code2.png",
                    Brand = "VS Code",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new()
                {
                    Name = "Purple React Gloves",
                    Description = "Stylish React-themed gloves that pair well with any dev outfit.",
                    Price = 1600,
                    PictureUrl = "/images/products/glove-react1.png",
                    Brand = "React",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new()
                {
                    Name = "Green React Gloves",
                    Description = "Soft-touch gloves for comfortable full-day wear.",
                    Price = 1400,
                    PictureUrl = "/images/products/glove-react2.png",
                    Brand = "React",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new()
                {
                    Name = "Redis Red Boots",
                    Description = "Premium leather boots with a bold Redis-red finish.",
                    Price = 25000,
                    PictureUrl = "/images/products/boot-redis1.png",
                    Brand = "Redis",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new()
                {
                    Name = "Core Red Boots",
                    Description = "Durable boots for NetCore developers who never quit.",
                    Price = 18999,
                    PictureUrl = "/images/products/boot-core2.png",
                    Brand = "NetCore",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new()
                {
                    Name = "Core Purple Boots",
                    Description = "Elegant deep purple boots made for confident developers.",
                    Price = 19999,
                    PictureUrl = "/images/products/boot-core1.png",
                    Brand = "NetCore",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new()
                {
                    Name = "Angular Purple Boots",
                    Description = "A stylish Angular-themed boot with performance comfort.",
                    Price = 15000,
                    PictureUrl = "/images/products/boot-ang2.png",
                    Brand = "Angular",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new()
                {
                    Name = "Angular Blue Boots",
                    Description = "Comfortable, high-traction boots in bold Angular blue.",
                    Price = 18000,
                    PictureUrl = "/images/products/boot-ang1.png",
                    Brand = "Angular",
                    Type = "Boots",
                    QuantityInStock = 100
                }
            };

            // Add all products to the database and save changes
            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}
