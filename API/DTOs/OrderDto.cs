using API.Entities.OderAggregate;

namespace API.DTOs;

/// <summary>
/// Data Transfer Object (DTO) that represents an order returned to the client.
/// Contains full order details including buyer info, shipping address, ordered items,
/// pricing breakdown, and payment information.
/// </summary>
public class OrderDto
{
    /// <summary>
    /// Unique identifier of the order.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// The email address of the buyer associated with this order.
    /// </summary>
    public required string BuyerEmail { get; set; }

    /// <summary>
    /// The shipping address provided by the buyer for order delivery.
    /// </summary>
    public required ShippingAddress ShippingAddress { get; set; }

    /// <summary>
    /// The UTC date and time when the order was created.
    /// </summary>
    public DateTime OrderDate { get; set; }

    /// <summary>
    /// The list of items included in this order.
    /// Each item contains product details, price, and quantity purchased.
    /// </summary>
    public List<OrderItemDto> OrderItems { get; set; } = [];

    /// <summary>
    /// The total cost of all items before additional fees or discounts.
    /// </summary>
    public decimal Subtotal { get; set; }

    /// <summary>
    /// The delivery or shipping fee applied to this order.
    /// </summary>
    public decimal DeliveryFee { get; set; }

    /// <summary>
    /// The total discount applied to this order (if any).
    /// </summary>
    public decimal Discount { get; set; }

    /// <summary>
    /// The final total amount after applying delivery fees and discounts.
    /// Calculated as <c>Subtotal + DeliveryFee - Discount</c>.
    /// </summary>
    public decimal Total { get; set; }

    /// <summary>
    /// The current status of the order (e.g., "Pending", "PaymentReceived", "PaymentFailed").
    /// </summary>
    public required string OrderStatus { get; set; }

    /// <summary>
    /// A summary of the payment method used for this order,
    /// including card brand, last 4 digits, and expiration details.
    /// </summary>
    public required PaymentSummary PaymentSummary { get; set; }
}
