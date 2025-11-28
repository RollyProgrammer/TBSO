namespace API.Entities.OderAggregate;

/// <summary>
/// Represents the various states an order can be in during its lifecycle.
/// Used to track and manage order processing and payment flow.
/// </summary>
public enum OrderStatus
{
    /// <summary>
    /// The order has been created but payment has not yet been confirmed.
    /// </summary>
    Pending,

    /// <summary>
    /// Payment has been successfully received and verified.
    /// The order is ready for fulfillment or shipping.
    /// </summary>
    PaymentReceived,

    /// <summary>
    /// The payment attempt failed (e.g., declined card or processing error).
    /// The order remains unpaid.
    /// </summary>
    PaymentFailed,

    /// <summary>
    /// A payment was received but the amount or details did not match the expected order total.
    /// Requires manual review or reconciliation.
    /// </summary>
    PaymentMismatch
}
