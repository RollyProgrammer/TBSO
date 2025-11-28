using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OderAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

/// <summary>
/// Handles order creation, retrieval, and detail viewing for authenticated and guest users.
/// Integrates with basket data to create valid orders and applies delivery fee logic.
/// </summary>
public class OrdersController(StoreContext context) : BaseApiController
{
    /// <summary>
    /// Retrieves all orders associated with the current authenticated user.
    /// </summary>
    /// <returns>A list of <see cref="OrderDto"/> objects representing the user's orders.</returns>
    [HttpGet]
    public async Task<ActionResult<List<OrderDto>>> GetOrders()
    {
        var orders = await context.Orders
            .ProjectToDto()
            .Where(x => x.BuyerEmail == User.GetUsername())
            .ToListAsync();

        return orders;
    }

    /// <summary>
    /// Retrieves detailed information for a specific order by its ID.
    /// </summary>
    /// <param name="id">The unique ID of the order to retrieve.</param>
    /// <returns>
    /// An <see cref="OrderDto"/> representing the order details,
    /// or a 404 Not Found response if no order matches the provided ID.
    /// </returns>
    [HttpGet("{id:int}")]
    public async Task<ActionResult<OrderDto>> GetOrderDetails(int id)
    {
        var order = await context.Orders
            .ProjectToDto()
            .Where(x => x.BuyerEmail == User.GetUsername() && id == x.Id)
            .FirstOrDefaultAsync();

        if (order == null) return NotFound();
        return order;
    }

    /// <summary>
    /// Creates a new order based on the contents of the current user's basket.
    /// </summary>
    /// <param name="orderDto">The data transfer object containing order details, such as shipping and payment summary.</param>
    /// <returns>
    /// The created <see cref="Order"/> object with a 201 Created status if successful,
    /// or a 400 Bad Request response if validation fails.
    /// </returns>
    [AllowAnonymous]
    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
    {
        var basket = await context.Baskets.GetBasketWithItems(Request.Cookies["basketId"]);

        if (basket == null || basket.Items.Count == 0 || string.IsNullOrEmpty(basket.PaymentIntentId))
            return BadRequest("Basket is empty or not found");

        var items = CreatedOrderItems(basket.Items);
        if (items == null) return BadRequest("Some items out of stock");

        var subtotal = items.Sum(x => x.Price * x.Quantity);
        var deliveryFee = CalculateDeliveryFee(subtotal);

        // Check for existing order linked to this payment intent (idempotency)
        var order = await context.Orders
            .Include(x => x.OrderItems)
            .FirstOrDefaultAsync(x => x.PaymentIntentId == basket.PaymentIntentId);

        if (order == null)
        {
            order = new Order
            {
                OrderItems = items,
                // TODO: Replace hardcoded buyer email with User.GetUsername() after enabling authentication
                BuyerEmail = "testuser@example.com",
                ShippingAddress = orderDto.ShippingAddress,
                DeliveryFee = (decimal)deliveryFee,
                Subtotal = subtotal,
                PaymentSummary = orderDto.PaymentSummary,
                PaymentIntentId = basket.PaymentIntentId
            };

            context.Orders.Add(order);
        }
        else
        {
            order.OrderItems = items;
        }

        var result = await context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("Problem creating order");

        return CreatedAtAction(nameof(GetOrderDetails), new { id = order.Id }, order.ToDto());
    }

    /// <summary>
    /// Calculates the delivery fee based on order subtotal.
    /// Orders above ₱10,000 get free shipping.
    /// </summary>
    /// <param name="subtotal">The total subtotal of the order before delivery.</param>
    /// <returns>The delivery fee amount (₱0 or ₱500).</returns>
    private object CalculateDeliveryFee(decimal subtotal)
    {
        return subtotal > 10000m ? 0m : 500m;
    }

    /// <summary>
    /// Converts a basket's items into order items while updating product stock levels.
    /// </summary>
    /// <param name="items">The list of basket items to convert.</param>
    /// <returns>
    /// A list of <see cref="OrderItem"/> objects representing the finalized order items,
    /// or null if any item is out of stock.
    /// </returns>
    private List<OrderItem>? CreatedOrderItems(List<BasketItem> items)
    {
        var orderItems = new List<OrderItem>();

        foreach (var item in items)
        {
            if (item.Product.QuantityInStock < item.Quantity)
                return null;

            var orderItem = new OrderItem
            {
                ItemOrdered = new ProductItemOrdered
                {
                    ProductId = item.ProductId,
                    PictureUrl = item.Product.PictureUrl,
                    Name = item.Product.Name
                },
                Price = item.Product.Price,
                Quantity = item.Quantity
            };

            orderItems.Add(orderItem);

            // Deduct stock
            item.Product.QuantityInStock -= item.Quantity;
        }

        return orderItems;
    }
}
