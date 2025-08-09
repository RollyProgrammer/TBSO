using API.Entities;
using API.Entities.OderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets { get; set; }
    public required DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>()
        .HasData(
            new IdentityRole { Id = "ecb4fe3a-6644-4f20-aeb1-c08dee69a26e", Name = "Member", NormalizedName = "MEMBER" },
            new IdentityRole { Id = "f34c52c9-36b5-4b12-be52-6056a626eb61", Name = "Admin", NormalizedName = "ADMIN" }
        );
    }
}
