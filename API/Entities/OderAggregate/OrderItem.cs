using System;

namespace API.Entities.OderAggregate;

public class OrderItem
{
    public int Id { get; set; }
    public required ProductItemOrdered ItemOrdered { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}
