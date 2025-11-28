namespace API.Entities
{
    /// <summary>
    /// Represents a shopping basket that holds products a user intends to purchase.
    /// </summary>
    public class Basket
    {
        /// <summary>
        /// Primary key for the basket entity.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Unique identifier used to associate the basket with a user or session.
        /// </summary>
        public required string BasketId { get; set; }

        /// <summary>
        /// List of items currently in the basket.
        /// </summary>
        public List<BasketItem> Items { get; set; } = [];

        /// <summary>
        /// Used to securely communicate payment information directly with Paymongo (e.g., client-side secret key).
        /// </summary>
        public string? ClientSecret { get; set; }

        /// <summary>
        /// Unique identifier for the payment intent created in Paymongo.
        /// </summary>
        public string? PaymentIntentId { get; set; }

        /// <summary>
        /// Adds a product to the basket. If the product already exists, increments its quantity.
        /// </summary>
        /// <param name="product">The product to be added.</param>
        /// <param name="quantity">The quantity of the product to add.</param>
        /// <exception cref="ArgumentNullException">Thrown when the product is null.</exception>
        /// <exception cref="ArgumentException">Thrown when the quantity is less than or equal to zero.</exception>
        public void AddItem(Product product, int quantity)
        {
            if (product == null)
                ArgumentNullException.ThrowIfNull(product);

            if (quantity <= 0)
                throw new ArgumentException("Quantity should be greater than zero", nameof(quantity));

            // Try to find the product in the existing basket items
            var existingItem = FindItem(product.Id);

            if (existingItem == null)
            {
                // Add new product to the basket
                Items.Add(new BasketItem
                {
                    ProductId = product.Id,
                    Product = product,
                    Quantity = quantity
                });
            }
            else
            {
                // If product already exists, just increase the quantity
                existingItem.Quantity += quantity;
            }
        }

        /// <summary>
        /// Removes a specific quantity of a product from the basket.
        /// Removes the item entirely if the quantity reaches zero or below.
        /// </summary>
        /// <param name="productId">The ID of the product to remove.</param>
        /// <param name="quantity">The quantity to remove.</param>
        /// <exception cref="ArgumentException">Thrown when the quantity is less than or equal to zero.</exception>
        public void RemoveItem(int productId, int quantity)
        {
            if (quantity <= 0)
                throw new ArgumentException("Quantity should be greater than zero", nameof(quantity));

            var item = FindItem(productId);
            if (item == null) return; // No item found, nothing to remove

            item.Quantity -= quantity;

            // If the quantity drops to zero or below, remove the item completely
            if (item.Quantity <= 0)
                Items.Remove(item);
        }

        /// <summary>
        /// Finds a basket item by its associated product ID.
        /// </summary>
        /// <param name="productId">The ID of the product to find.</param>
        /// <returns>The matching <see cref="BasketItem"/> if found; otherwise, null.</returns>
        private BasketItem? FindItem(int productId)
            => Items.FirstOrDefault(item => item.ProductId == productId);

        /// <summary>
        /// Calculates the subtotal of all items in the basket.
        /// </summary>
        /// <returns>The total cost before taxes and discounts.</returns>
        public decimal GetSubtotal()
            => Items.Sum(item => item.Quantity * item.Product.Price);
    }
}
