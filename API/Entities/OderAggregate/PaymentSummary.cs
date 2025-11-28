using System;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace API.Entities.OderAggregate;

 /// <summary>
/// Represents a summary of payment card details associated with an order.
/// This entity is owned by the <see cref="Order"/> entity and is not stored as a separate table.
/// </summary>
[Owned]
public class PaymentSummary
{
    /// <summary>
    /// The last four digits of the payment card used.
    /// Stored for reference and troubleshooting purposes.
    /// </summary>
    public int Last4 { get; set; }

    /// <summary>
    /// The brand or network of the card (e.g., Visa, MasterCard).
    /// </summary>
    public required string Brand { get; set; }

    /// <summary>
    /// The expiration month of the payment card.
    /// Serialized as "exp_month" to match payment gateway conventions.
    /// </summary>
    [JsonPropertyName("exp_month")]
    public int ExpMonth { get; set; }

    /// <summary>
    /// The expiration year of the payment card.
    /// Serialized as "exp_year" to match payment gateway conventions.
    /// </summary>
    [JsonPropertyName("exp_year")]
    public int ExpYear { get; set; }
}
