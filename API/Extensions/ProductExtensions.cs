using API.Entities;

namespace API.Extensions;

/// <summary>
/// Provides extension methods for querying and manipulating <see cref="Product"/> entities.
/// </summary>
/// <remarks>
/// These methods add reusable functionality for sorting, searching, and filtering products
/// within LINQ queries, typically used in repositories or controllers handling product listings.
/// </remarks>
public static class ProductExtensions
{
    /// <summary>
    /// Sorts the product query based on a specified order criteria.
    /// </summary>
    /// <param name="query">The queryable sequence of <see cref="Product"/> entities.</param>
    /// <param name="orderBy">
    /// The sorting criteria.  
    /// Accepts:
    /// <list type="bullet">
    /// <item><description><c>"price"</c> — sorts by price ascending.</description></item>
    /// <item><description><c>"pricedesc"</c> — sorts by price descending.</description></item>
    /// <item><description>Any other value (default) — sorts alphabetically by product name.</description></item>
    /// </list>
    /// </param>
    /// <returns>A sorted <see cref="IQueryable{Product}"/> sequence.</returns>
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string? orderBy)
    {
        // Determine sorting rule based on the provided orderBy string.
        return (orderBy ?? string.Empty).ToLower() switch
        {
            "price" => query.OrderBy(p => (double)p.Price), // Sort by price ascending
            "pricedesc" => query.OrderByDescending(p => (double)p.Price), // Sort by price descending
            _ => query.OrderBy(p => p.Name) // Default: sort by product name alphabetically
        };
    }

    /// <summary>
    /// Filters the product query based on a search term in the product name.
    /// </summary>
    /// <param name="query">The queryable sequence of <see cref="Product"/> entities.</param>
    /// <param name="searchTerm">The text to search for within product names.</param>
    /// <returns>
    /// A filtered <see cref="IQueryable{Product}"/> sequence that only includes products
    /// containing the provided search term (case-insensitive).
    /// </returns>
    public static IQueryable<Product> Search(this IQueryable<Product> query, string? searchTerm)
    {
        // If no search term is provided, return the original query.
        if (string.IsNullOrEmpty(searchTerm)) return query;

        // Normalize the search term for case-insensitive comparison.
        var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

        // Return products whose names contain the search term.
        return query.Where(x => x.Name.ToLower().Contains(lowerCaseSearchTerm));
    }

    /// <summary>
    /// Filters the product query by specified brand(s) and/or type(s).
    /// </summary>
    /// <param name="query">The queryable sequence of <see cref="Product"/> entities.</param>
    /// <param name="brands">A comma-separated list of brand names to include (case-insensitive).</param>
    /// <param name="types">A comma-separated list of product types to include (case-insensitive).</param>
    /// <returns>
    /// A filtered <see cref="IQueryable{Product}"/> sequence that only includes
    /// products matching the specified brands and/or types.
    /// </returns>
    /// <remarks>
    /// - If <paramref name="brands"/> or <paramref name="types"/> are null or empty,
    ///   that filter is ignored.<br/>
    /// - Designed to support multiple comma-separated values for flexible filtering.
    /// </remarks>
    public static IQueryable<Product> Filter(this IQueryable<Product> query, string? brands, string? types)
    {
        var brandList = new List<string>();
        var typeList = new List<string>();

        // Split and normalize brand filters if provided.
        if (!string.IsNullOrEmpty(brands))
        {
            brandList.AddRange([.. brands.ToLower().Split(",")]);
        }

        // Split and normalize type filters if provided.
        if (!string.IsNullOrEmpty(types))
        {
            typeList.AddRange([.. types.ToLower().Split(",")]);
        }

        // Apply brand filter (if any)
        query = query.Where(x => brandList.Count == 0 || brandList.Contains(x.Brand.ToLower()));

        // Apply type filter (if any)
        query = query.Where(x => typeList.Count == 0 || typeList.Contains(x.Type.ToLower()));

        return query;
    }
}
