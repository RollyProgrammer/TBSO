namespace API.RequestHelpers;

/// <summary>
/// Represents filtering, searching, and sorting parameters
/// for querying products, including pagination support.
/// </summary>
public class ProductParams : PaginationParams
{
    /// <summary>
    /// The property by which to order products.
    /// Possible values could include "price", "priceDesc", or "name".
    /// </summary>
    public string? OrderBy { get; set; }

    /// <summary>
    /// The search keyword used to match product names.
    /// This is typically a partial or full product name entered by the user.
    /// </summary>
    public string? SearchTerm { get; set; }

    /// <summary>
    /// A comma-separated list of brand names used to filter products.
    /// Example: "nike,adidas,puma".
    /// </summary>
    public string? Brands { get; set; }

    /// <summary>
    /// A comma-separated list of product types used to filter results.
    /// Example: "shoes,shirts,accessories".
    /// </summary>
    public string? Types { get; set; }
}
