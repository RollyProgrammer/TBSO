using System.Text.Json.Serialization;

namespace API.DTOs.Paymongo
{
    /// <summary>
    /// Represents the root object of a webhook event sent by PayMongo.
    /// This object is received by your webhook endpoint when a payment event occurs
    /// (e.g., payment succeeded or failed).
    /// </summary>
    public class PaymongoWebhookEvent
    {
        /// <summary>
        /// Contains the actual event data including its ID and attributes.
        /// </summary>
        [JsonPropertyName("data")]
        public WebhookData? Data { get; set; }
    }

    /// <summary>
    /// Represents the data section of the PayMongo webhook payload.
    /// Includes the event ID and event attributes.
    /// </summary>
    public class WebhookData
    {
        /// <summary>
        /// The unique identifier of the webhook event.
        /// </summary>
        [JsonPropertyName("id")]
        public string? Id { get; set; }

        /// <summary>
        /// Contains event-specific attributes such as type, timestamp, and payment data.
        /// </summary>
        [JsonPropertyName("attributes")]
        public WebhookAttributes? Attributes { get; set; }
    }

    /// <summary>
    /// Represents the attributes section of the webhook data,
    /// including the event type, creation time, and related payment information.
    /// </summary>
    public class WebhookAttributes
    {
        /// <summary>
        /// The type of event triggered by PayMongo.
        /// Common values: "payment.paid" or "payment.failed".
        /// </summary>
        [JsonPropertyName("type")]
        public string? Type { get; set; }

        /// <summary>
        /// The Unix timestamp (in seconds) indicating when the event was created.
        /// </summary>
        [JsonPropertyName("created_at")]
        public long CreatedAt { get; set; }

        /// <summary>
        /// Contains detailed information about the payment related to this event.
        /// </summary>
        [JsonPropertyName("data")]
        public PaymentData? Data { get; set; }
    }

    /// <summary>
    /// Represents the payment data object included within a webhook event.
    /// </summary>
    public class PaymentData
    {
        /// <summary>
        /// The unique identifier of the payment record in PayMongo.
        /// </summary>
        [JsonPropertyName("id")]
        public string? Id { get; set; }

        /// <summary>
        /// Contains detailed payment attributes such as amount, currency, and status.
        /// </summary>
        [JsonPropertyName("attributes")]
        public PaymentAttributes? Attributes { get; set; }
    }

    /// <summary>
    /// Represents the core payment attributes sent by PayMongo in a webhook event.
    /// These fields describe the actual transaction result.
    /// </summary>
    public class PaymentAttributes
    {
        /// <summary>
        /// The total amount paid or attempted, represented in the smallest currency unit (e.g., centavos).
        /// </summary>
        [JsonPropertyName("amount")]
        public int Amount { get; set; }

        /// <summary>
        /// The currency used for the payment (e.g., "PHP").
        /// </summary>
        [JsonPropertyName("currency")]
        public string? Currency { get; set; }

        /// <summary>
        /// The final status of the payment.
        /// Common values: "paid" or "failed".
        /// </summary>
        [JsonPropertyName("status")]
        public string? Status { get; set; }

        /// <summary>
        /// The identifier of the PayMongo payment intent associated with this payment.
        /// Used to match webhook events to specific transactions in your system.
        /// </summary>
        [JsonPropertyName("payment_intent_id")]
        public string? PaymentIntentId { get; set; }
    }
}
