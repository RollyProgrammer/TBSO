using API.Entities;
using API.Entities.OderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    /// <summary>
    /// The Entity Framework Core database context for the application.
    /// Integrates ASP.NET Core Identity for authentication and manages
    /// entity sets for Products, Baskets, and Orders.
    /// </summary>
    public class StoreContext : IdentityDbContext<User>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="StoreContext"/> class.
        /// </summary>
        /// <param name="options">The configuration options for the DbContext.</param>
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        /// <summary>
        /// Represents the collection of products available in the store.
        /// </summary>
        public required DbSet<Product> Products { get; set; }

        /// <summary>
        /// Represents shopping baskets associated with users.
        /// </summary>
        public required DbSet<Basket> Baskets { get; set; }

        /// <summary>
        /// Represents orders placed by users.
        /// </summary>
        public required DbSet<Order> Orders { get; set; }

        /// <summary>
        /// Configures entity relationships, constraints, and seeds default roles.
        /// </summary>
        /// <param name="builder">The model builder used to configure the entity model.</param>
        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Call base configuration for ASP.NET Identity integration
            base.OnModelCreating(builder);

            // Seed default application roles
            builder.Entity<IdentityRole>().HasData(
                new IdentityRole
                {
                    Id = "ecb4fe3a-6644-4f20-aeb1-c08dee69a26e",
                    Name = "Member",
                    NormalizedName = "MEMBER"
                },
                new IdentityRole
                {
                    Id = "f34c52c9-36b5-4b12-be52-6056a626eb61",
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                }
            );
        }
    }
}
