namespace API.DTOs.Paymongo;

/// <summary>
/// Data Transfer Object (DTO) used to attach a payment method to an existing payment intent
/// in the PayMongo payment flow.
/// </summary>
public class AttachPaymentMethodDto
{
    /// <summary>
    /// The unique identifier of the PayMongo payment intent.  
    /// This represents the specific transaction being processed.
    /// </summary>
    public required string IntentId { get; set; }

    /// <summary>
    /// The unique identifier of the PayMongo payment method.  
    /// This is the card, wallet, or payment source that will be attached to the intent.
    /// </summary>
    public required string PaymentMethodId { get; set; }
}
