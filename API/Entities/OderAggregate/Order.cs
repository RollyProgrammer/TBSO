namespace API.Entities.OderAggregate;

    // <summary>
    /// Represents a customer order containing purchased items, payment details, and shipping information.
    /// </summary>
public class Order
{
    /// <summary>
    /// Primary key for the order entity.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// The email address of the buyer associated with this order.
    /// Used for identifying and contacting the customer.
    /// </summary>
    public required string BuyerEmail { get; set; }

    /// <summary>
    /// The shipping address where the order will be delivered.
    /// </summary>
    public required ShippingAddress ShippingAddress { get; set; }

    /// <summary>
    /// The date and time when the order was created (in UTC).
    /// Defaults to the current UTC time.
    /// </summary>
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Collection of items included in the order.
    /// </summary>
    public List<OrderItem> OrderItems { get; set; } = [];
    
    /// <summary>
    /// The subtotal amount before delivery fees and discounts.
    /// </summary>
    public decimal Subtotal { get; set; }

     /// <summary>
    /// The fee applied for delivering the order to the specified shipping address.
    /// </summary>
    public decimal DeliveryFee { get; set; }

    /// <summary>
    /// The discount applied to the order (e.g., coupon or promo deduction).
    /// </summary>
    public decimal Discount { get; set; }

     /// <summary>
    /// The unique payment intent ID from the payment provider (e.g., Paymongo, Stripe).
    /// Used to track the payment transaction associated with this order.
    /// </summary>
    public required string PaymentIntentId { get; set; }

    /// <summary>
    /// Current status of the order (e.g., Pending, Paid, Shipped, Cancelled).
    /// </summary>
    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
    
    /// <summary>
    /// Summary of the payment details including method, reference number, or gateway metadata.
    /// </summary>
    public required PaymentSummary PaymentSummary { get; set; }


     /// <summary>
    /// Calculates the total amount due for the order after applying delivery fees and discounts.
    /// </summary>
    /// <returns>The final total amount for the order.</returns>
    public decimal GetTotal()
    {
        return Subtotal + DeliveryFee - Discount;
    }

}

