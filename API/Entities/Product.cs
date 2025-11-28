namespace API.Entities
{
    /// <summary>
    /// Represents a product available in the catalog or store.
    /// Contains basic details such as name, price, type, and inventory data.
    /// </summary>
    public class Product
    {
        /// <summary>
        /// Primary key for the product entity.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// The display name of the product.
        /// </summary>
        public required string Name { get; set; }

        /// <summary>
        /// A detailed description of the product, used for display and search.
        /// </summary>
        public required string Description { get; set; }

        /// <summary>
        /// The selling price of the product.
        /// </summary>
        public decimal Price { get; set; }

        /// <summary>
        /// The URL pointing to the product’s main image.
        /// Typically stored in a cloud storage service (e.g., Cloudinary, Azure Blob).
        /// </summary>
        public required string PictureUrl { get; set; }

        /// <summary>
        /// The category or type of product (e.g., "Electronics", "Apparel").
        /// </summary>
        public required string Type { get; set; }

        /// <summary>
        /// The brand or manufacturer of the product.
        /// </summary>
        public required string Brand { get; set; }

        /// <summary>
        /// The total number of units currently available in stock.
        /// </summary>
        public int QuantityInStock { get; set; }

        /// <summary>
        /// Optional public identifier used for image or resource management (e.g., Cloudinary public ID).
        /// </summary>
        public string? PublicId { get; set; }

        /// <summary>
        /// The total number of units sold.
        /// Useful for analytics, popularity tracking, or inventory forecasting.
        /// </summary>
        public int UnitsSold { get; set; }

        /// <summary>
        /// The UTC timestamp indicating when the product was created.
        /// Defaults to the current UTC time upon entity creation.
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
