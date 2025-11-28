using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    /// <summary>
    /// Represents a specific product entry within a user's basket.
    /// Each BasketItem links a product to a basket along with its quantity.
    /// </summary>
    [Table("BasketItems")]
    public class BasketItem
    {
        /// <summary>
        /// Primary key for the basket item.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// The quantity of the product in the basket.
        /// </summary>
        public int Quantity { get; set; }

        /// <summary>
        /// Foreign key referencing the associated product.
        /// </summary>
        public int ProductId { get; set; }

        /// <summary>
        /// Navigation property representing the product linked to this basket item.
        /// </summary>
        public required Product Product { get; set; }

        /// <summary>
        /// Foreign key referencing the basket that owns this item.
        /// </summary>
        public int BasketId { get; set; }

        /// <summary>
        /// Navigation property representing the basket that this item belongs to.
        /// Initialized with a non-null value to satisfy nullable reference type requirements.
        /// </summary>
        public Basket Basket { get; set; } = null!;
    }
}
