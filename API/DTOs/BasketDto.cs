namespace API.DTOs;

/// <summary>
/// Data Transfer Object (DTO) representing a shopping basket.
/// Used to send basket data between the backend API and frontend client.
/// </summary>
public class BasketDto
{
    /// <summary>
    /// Primary key identifier for the basket in the database.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Unique string identifier associated with a user’s session or account.
    /// Typically used to retrieve a user’s basket even if they’re not authenticated.
    /// </summary>
    public required string BasketId { get; set; }

    /// <summary>
    /// Collection of items currently in the basket.
    /// </summary>
    public List<BasketItemDto> Items { get; set; } = [];

    /// <summary>
    /// Secret key returned by the payment gateway (e.g., Stripe or PayMongo)
    /// used to securely complete client-side payments.
    /// </summary>
    public string? ClientSecret { get; set; }

    /// <summary>
    /// Unique identifier of the payment intent, used to track payment status.
    /// </summary>
    public string? PaymentIntentId { get; set; }
}
