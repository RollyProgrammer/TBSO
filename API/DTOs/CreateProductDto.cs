using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

/// <summary>
/// Data Transfer Object (DTO) used when creating a new product in the catalog.
/// Contains all required product details and an uploaded image file.
/// </summary>
public class CreateProductDto
{
    /// <summary>
    /// The name of the product.
    /// </summary>
    [Required]
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// A detailed description of the product.
    /// </summary>
    [Required]
    public required string Description { get; set; } = string.Empty;

    /// <summary>
    /// The product's price in PHP (₱).  
    /// Must be at least 100 to avoid invalid pricing.
    /// </summary>
    [Required]
    [Range(100, double.PositiveInfinity, ErrorMessage = "Price must be at least ₱100.")]
    public decimal Price { get; set; }

    /// <summary>
    /// The image file to upload for this product.  
    /// Used to generate a <c>PictureUrl</c> stored in the database.
    /// </summary>
    [Required]
    public IFormFile File { get; set; } = null!;

    /// <summary>
    /// The category or classification of the product (e.g., “Electronics”, “Apparel”).
    /// </summary>
    [Required]
    public required string Type { get; set; }

    /// <summary>
    /// The brand or manufacturer name of the product.
    /// </summary>
    [Required]
    public required string Brand { get; set; }

    /// <summary>
    /// The total number of items in stock for this product.
    /// Must be between 0 and 1000.
    /// </summary>
    [Required]
    [Range(0, 1000, ErrorMessage = "Quantity in stock must be between 0 and 1000.")]
    public int QuantityInStock { get; set; }
}
