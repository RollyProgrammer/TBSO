using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

/// <summary>
/// Manages the shopping basket, allowing clients to add, remove, and retrieve basket items.
/// </summary>
public class BasketController(StoreContext context) : BaseApiController
{
    /// <summary>
    /// Retrieves the current user's basket using the basket ID stored in cookies.
    /// </summary>
    /// <returns>
    /// Returns the current basket as a <see cref="BasketDto"/> if found,
    /// or 204 No Content if no basket exists.
    /// </returns>
    [HttpGet]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket();

        if (basket == null) return NoContent();

        return basket.ToDto();
    }

    /// <summary>
    /// Adds an item to the user's basket. If no basket exists, a new one is created.
    /// </summary>
    /// <param name="productId">The ID of the product to add.</param>
    /// <param name="quantity">The quantity of the product to add.</param>
    /// <returns>
    /// Returns the updated basket as a <see cref="BasketDto"/> upon success,
    /// or a 400 Bad Request if the operation fails.
    /// </returns>
    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {
        var basket = await RetrieveBasket();

        // Create a new basket if one doesn’t exist
        basket ??= CreateBasket();

        var product = await context.Products.FindAsync(productId);

        if (product == null) return BadRequest("Problem adding item to basket");

        // Add item and save changes
        basket.AddItem(product, quantity);

        var result = await context.SaveChangesAsync() > 0;

        if (result) return CreatedAtAction(nameof(GetBasket), basket.ToDto());

        return BadRequest("Problem updating basket");
    }

    /// <summary>
    /// Removes a specific quantity of a product from the basket. 
    /// If quantity becomes zero, the item is removed entirely.
    /// </summary>
    /// <param name="productId">The ID of the product to remove.</param>
    /// <param name="quantity">The number of items to remove.</param>
    /// <returns>
    /// Returns 200 OK if successful, or 400 Bad Request if the update fails.
    /// </returns>
    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
        var basket = await RetrieveBasket();

        if (basket == null) return BadRequest("Unable to retrieve basket");

        basket.RemoveItem(productId, quantity);

        var result = await context.SaveChangesAsync() > 0;

        if (result) return Ok();

        return BadRequest("Problem updating basket");
    }

    /// <summary>
    /// Creates a new basket and stores its unique ID in a client cookie.
    /// </summary>
    /// <returns>The newly created <see cref="Basket"/> instance.</returns>
    private Basket CreateBasket()
    {
        var basketId = Guid.NewGuid().ToString();

        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.Now.AddDays(30)
        };

        // Store basketId in a cookie for persistence
        Response.Cookies.Append("basketId", basketId, cookieOptions);

        var basket = new Basket { BasketId = basketId };

        context.Baskets.Add(basket);

        return basket;
    }

    /// <summary>
    /// Retrieves the user's basket by basket ID stored in cookies or provided manually.
    /// Includes all related items and their products.
    /// </summary>
    /// <param name="basketId">Optional basket ID; if null, retrieves from cookies.</param>
    /// <returns>
    /// Returns the <see cref="Basket"/> if found, or null if no basket exists.
    /// </returns>
    private async Task<Basket?> RetrieveBasket(string? basketId = null)
    {
        basketId ??= Request.Cookies["basketId"];

        if (string.IsNullOrEmpty(basketId))
            return null;

        return await context.Baskets
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.BasketId == basketId);
    }
}
