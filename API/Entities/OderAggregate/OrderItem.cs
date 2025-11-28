namespace API.Entities.OderAggregate;

/// <summary>
/// Represents a specific product included in an order.
/// Contains product details, unit price, and quantity ordered.
/// </summary>
public class OrderItem
{
        /// <summary>
        /// Primary key for the order item entity.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Contains product snapshot information at the time of ordering.
        /// This ensures that even if product details change later, 
        /// the order retains the original product data.
        /// </summary>
        public required ProductItemOrdered ItemOrdered { get; set; }

        /// <summary>
        /// The price per unit of the ordered product at the time of purchase.
        /// </summary>
        public decimal Price { get; set; }

        /// <summary>
        /// The quantity of this product included in the order.
        /// </summary>
        public int Quantity { get; set; }
}
