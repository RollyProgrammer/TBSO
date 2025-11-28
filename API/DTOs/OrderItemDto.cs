using System;

namespace API.DTOs;

/// <summary>
/// Data Transfer Object (DTO) representing a single item within an order.
/// Used when displaying or returning order details to the client.
/// </summary>
public class OrderItemDto
{
    /// <summary>
    /// The unique identifier of the product associated with this order item.
    /// </summary>
    public int ProductId { get; set; }

    /// <summary>
    /// The name of the product at the time of purchase.
    /// </summary>
    public required string Name { get; set; }

    /// <summary>
    /// The image URL of the product as displayed when the order was placed.
    /// </summary>
    public required string PictureUrl { get; set; }

    /// <summary>
    /// The price per unit of the product at the time of purchase.
    /// </summary>
    public decimal Price { get; set; }

    /// <summary>
    /// The number of units of this product included in the order.
    /// </summary>
    public int Quantity { get; set; }
}
