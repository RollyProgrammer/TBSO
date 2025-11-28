using Microsoft.EntityFrameworkCore;

namespace API.Entities.OderAggregate;

/// <summary>
/// Represents a snapshot of product details at the time an order was placed.
/// This ensures that even if product data changes later (e.g., name, image),
/// the order retains the original product information for historical accuracy.
/// </summary>
[Owned]
public class ProductItemOrdered
{
    /// <summary>
    /// The unique identifier of the product at the time of ordering.
    /// </summary>
    public int ProductId { get; set; }

    /// <summary>
    /// The name of the product when the order was created.
    /// </summary>
    public required string Name { get; set; }

    /// <summary>
    /// The URL of the product image at the time of purchase.
    /// Useful for displaying order history with consistent visuals.
    /// </summary>
    public required string PictureUrl { get; set; }
}
