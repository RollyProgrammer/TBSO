namespace API.Entities.OderAggregate;

public class Order
{
    public int Id { get; set; }
    public required string BuyerEmail { get; set; }
    public required ShippingAddress ShippingAddress { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public List<OrderItem> OrderItems { get; set; } = [];
    public decimal Subtotal { get; set; }
    public decimal DeliveryFee { get; set; }
    public decimal Discount { get; set; }
    public required string PaymentIntentId { get; set; }
    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
    public required PaymentSummary PaymentSummary { get; set; }

    public decimal GetTotal()
    {
        return Subtotal + DeliveryFee - Discount;
    }

}

