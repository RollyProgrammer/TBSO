using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace API.Entities.OderAggregate;

/// <summary>
/// Represents the shipping address for an order. 
/// This class is marked as [Owned], meaning it is embedded inside the Order entity 
/// and does not have its own table in the database.
/// </summary>
[Owned]
public class ShippingAddress
{
    /// <summary>
    /// Full name of the recipient for the order shipment.
    /// </summary>
    public required string Name { get; set; }

    /// <summary>
    /// First line of the address (street address, P.O. box, company name, etc.).
    /// </summary>
    public required string Line1 { get; set; }

    /// <summary>
    /// Optional second line of the address (apartment, suite, unit, etc.).
    /// </summary>
    public string? Line2 { get; set; }

    /// <summary>
    /// City of the shipping address.
    /// </summary>
    public required string City { get; set; }

    /// <summary>
    /// State, province, or region of the shipping address.
    /// </summary>
    public required string State { get; set; }

    /// <summary>
    /// Postal or ZIP code of the shipping address.
    /// Serialized as "postal_code" in JSON to match external APIs (e.g., Stripe or PayMongo).
    /// </summary>
    [JsonPropertyName("postal_code")]
    public required string PostalCode { get; set; }

    /// <summary>
    /// Country of the shipping address.
    /// </summary>
    public required string Country { get; set; }
}
