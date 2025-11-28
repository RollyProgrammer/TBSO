using API.Entities.OderAggregate;

namespace API.DTOs;

/// <summary>
/// Data Transfer Object (DTO) used to create a new order.
/// Contains the shipping and payment details submitted by the client during checkout.
/// </summary>
public class CreateOrderDto
{
    /// <summary>
    /// The customer's shipping address for this order.
    /// Includes recipient name, address lines, city, state, postal code, and country.
    /// </summary>
    public required ShippingAddress ShippingAddress { get; set; }

    /// <summary>
    /// The summary of payment information associated with this order.
    /// Includes card brand, last 4 digits, and expiration details.
    /// </summary>
    public required PaymentSummary PaymentSummary { get; set; }
}
