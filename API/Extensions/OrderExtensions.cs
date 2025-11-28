using System;
using API.DTOs;
using API.Entities.OderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

/// <summary>
/// Provides extension methods for projecting and mapping <see cref="Order"/> entities
/// to <see cref="OrderDto"/> objects for API responses.
/// </summary>
/// <remarks>
/// These methods are useful for separating entity logic from data transfer object (DTO)
/// transformation logic, ensuring cleaner controller and repository code.
/// </remarks>
public static class OrderExtensions
{
    /// <summary>
    /// Projects a queryable collection of <see cref="Order"/> entities into
    /// <see cref="OrderDto"/> objects efficiently using LINQ.
    /// </summary>
    /// <param name="query">The queryable source of <see cref="Order"/> entities.</param>
    /// <returns>
    /// An <see cref="IQueryable{OrderDto}"/> representing a lightweight projection
    /// of order data for API consumption.
    /// </returns>
    /// <remarks>
    /// - Uses <see cref="EntityFrameworkQueryableExtensions.AsNoTracking{TEntity}(IQueryable{TEntity})"/>
    ///   to improve performance since tracking is unnecessary for read-only DTOs.<br/>
    /// - Converts nested <see cref="OrderItem"/> entities into <see cref="OrderItemDto"/> objects.
    /// </remarks>
    public static IQueryable<OrderDto> ProjectToDto(this IQueryable<Order> query)
    {
        return query.Select(order => new OrderDto
        {
            Id = order.Id,
            BuyerEmail = order.BuyerEmail,
            OrderDate = order.OrderDate,
            ShippingAddress = order.ShippingAddress,
            PaymentSummary = order.PaymentSummary,
            DeliveryFee = order.DeliveryFee,
            Subtotal = order.Subtotal,
            OrderStatus = order.OrderStatus.ToString(),
            Total = order.GetTotal(), // Compute total using domain logic
            OrderItems = order.OrderItems.Select(item => new OrderItemDto
            {
                ProductId = item.ItemOrdered.ProductId,
                Name = item.ItemOrdered.Name,
                PictureUrl = item.ItemOrdered.PictureUrl,
                Price = item.Price,
                Quantity = item.Quantity
            }).ToList()
        }).AsNoTracking(); // Prevent EF Core from tracking query results for performance
    }

    /// <summary>
    /// Converts a single <see cref="Order"/> entity instance into an <see cref="OrderDto"/>.
    /// </summary>
    /// <param name="order">The <see cref="Order"/> entity to map.</param>
    /// <returns>A fully mapped <see cref="OrderDto"/> instance.</returns>
    /// <remarks>
    /// Useful when working with an individual order retrieved from the database or domain logic.
    /// </remarks>
    public static OrderDto ToDto(this Order order)
    {
        return new OrderDto
        {
            Id = order.Id,
            BuyerEmail = order.BuyerEmail,
            OrderDate = order.OrderDate,
            ShippingAddress = order.ShippingAddress,
            PaymentSummary = order.PaymentSummary,
            DeliveryFee = order.DeliveryFee,
            Subtotal = order.Subtotal,
            OrderStatus = order.OrderStatus.ToString(),
            Total = order.GetTotal(), // Include computed total
            OrderItems = order.OrderItems.Select(item => new OrderItemDto
            {
                ProductId = item.ItemOrdered.ProductId,
                Name = item.ItemOrdered.Name,
                PictureUrl = item.ItemOrdered.PictureUrl,
                Price = item.Price,
                Quantity = item.Quantity
            }).ToList()
        };
    }
}
