using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext : DbContext
{
    public StoreContext(DbContextOptions options) : base(options)
    {
    }

    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets  { get; set; }
}
