using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

/// <summary>
/// Provides extension methods for converting and retrieving basket-related data.
/// Keeps controller logic cleaner and ensures consistency across the application.
/// </summary>
public static class BasketExtensions
{
    /// <summary>
    /// Converts a <see cref="Basket"/> entity into a <see cref="BasketDto"/>.
    /// </summary>
    /// <param name="basket">The basket entity to convert.</param>
    /// <returns>A <see cref="BasketDto"/> representing the basket and its items.</returns>
    /// <remarks>
    /// This method is useful for shaping entity data into a format suitable for API responses.
    /// </remarks>
    public static BasketDto ToDto(this Basket basket)
    {
        return new BasketDto
        {
            BasketId = basket.BasketId,
            ClientSecret = basket.ClientSecret,
            PaymentIntentId = basket.PaymentIntentId,
            Items = basket.Items.Select(x => new BasketItemDto
            {
                ProductId = x.ProductId,
                Name = x.Product.Name,
                Price = (long)x.Product.Price, // Convert product price to long for payment precision
                Brand = x.Product.Brand,
                Type = x.Product.Type,
                PictureUrl = x.Product.PictureUrl,
                Quantity = x.Quantity,
            }).ToList()
        };
    }

    /// <summary>
    /// Retrieves a basket from the database including its related items and product details.
    /// </summary>
    /// <param name="query">The IQueryable source (e.g., <c>context.Baskets</c>).</param>
    /// <param name="basketId">The basket's unique identifier, typically stored in cookies or client state.</param>
    /// <returns>
    /// The <see cref="Basket"/> object including its items and associated product data.
    /// Throws an exception if the basket cannot be retrieved.
    /// </returns>
    /// <example>
    /// Usage:
    /// <code>
    /// var basket = await _context.Baskets.GetBasketWithItems(basketId);
    /// </code>
    /// </example>
    public static async Task<Basket> GetBasketWithItems(this IQueryable<Basket> query, string? basketId)
    {
        return await query
            // Include related basket items
            .Include(x => x.Items)
            // Include product details for each basket item
            .ThenInclude(x => x.Product)
            // Find the basket that matches the given basketId
            .FirstOrDefaultAsync(x => x.BasketId == basketId)
            // Throw an exception if no basket is found
            ?? throw new Exception("Cannot get basket");
    }
}
