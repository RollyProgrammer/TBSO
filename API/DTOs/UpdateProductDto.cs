using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

/// <summary>
/// Data Transfer Object (DTO) used to update an existing product in the catalog.
/// Allows modification of product details and optionally its image.
/// </summary>
public class UpdateProductDto
{
    /// <summary>
    /// The unique identifier of the product to be updated.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// The updated name of the product.
    /// </summary>
    [Required(ErrorMessage = "Product name is required.")]
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// The updated description providing details about the product.
    /// </summary>
    [Required(ErrorMessage = "Product description is required.")]
    public required string Description { get; set; } = string.Empty;

    /// <summary>
    /// The updated price of the product in PHP (₱).  
    /// Must be at least 100 to ensure a valid price.
    /// </summary>
    [Required(ErrorMessage = "Price is required.")]
    [Range(100, double.PositiveInfinity, ErrorMessage = "Price must be at least ₱100.")]
    public decimal Price { get; set; }

    /// <summary>
    /// Optional new image file for the product.  
    /// If not provided, the existing image remains unchanged.
    /// </summary>
    public IFormFile? File { get; set; }

    /// <summary>
    /// The updated category or type of the product (e.g., "Electronics", "Clothing").
    /// </summary>
    [Required(ErrorMessage = "Product type is required.")]
    public required string Type { get; set; }

    /// <summary>
    /// The updated brand or manufacturer name of the product.
    /// </summary>
    [Required(ErrorMessage = "Product brand is required.")]
    public required string Brand { get; set; }

    /// <summary>
    /// The updated quantity in stock.  
    /// Must be between 0 and 1000 to ensure valid inventory levels.
    /// </summary>
    [Required(ErrorMessage = "Quantity in stock is required.")]
    [Range(0, 1000, ErrorMessage = "Quantity in stock must be between 0 and 1000.")]
    public int QuantityInStock { get; set; }
}
