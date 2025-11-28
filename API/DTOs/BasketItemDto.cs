namespace API.DTOs;

/// <summary>
/// Data Transfer Object (DTO) representing a single item within a shopping basket.
/// Used to transmit basket item details between the client and API.
/// </summary>
public class BasketItemDto
{
    /// <summary>
    /// Unique identifier of the product.
    /// Links to the corresponding Product entity.
    /// </summary>
    public int ProductId { get; set; }

    /// <summary>
    /// Name of the product being added to the basket.
    /// </summary>
    public required string Name { get; set; }

    /// <summary>
    /// Unit price of the product (in smallest currency unit, e.g., centavos if using PHP).
    /// </summary>
    public long Price { get; set; }

    /// <summary>
    /// URL of the product image displayed in the basket or checkout page.
    /// </summary>
    public required string PictureUrl { get; set; }

    /// <summary>
    /// Brand name associated with the product.
    /// </summary>
    public required string Brand { get; set; }

    /// <summary>
    /// Category or type of the product (e.g., Electronics, Clothing, etc.).
    /// </summary>
    public required string Type { get; set; }

    /// <summary>
    /// Quantity of this product currently in the basket.
    /// </summary>
    public int Quantity { get; set; }
}
