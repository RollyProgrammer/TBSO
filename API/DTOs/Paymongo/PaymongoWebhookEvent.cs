using System.Text.Json.Serialization;

namespace API.DTOs.Paymongo
{
    public class PaymongoWebhookEvent
    {
        [JsonPropertyName("data")]
        public WebhookData? Data { get; set; }
    }

    public class WebhookData
    {
        [JsonPropertyName("id")]
        public string? Id { get; set; }

        [JsonPropertyName("attributes")]
        public WebhookAttributes? Attributes { get; set; }
    }

    public class WebhookAttributes
    {
        [JsonPropertyName("type")]
        public string? Type { get; set; } // "payment.paid" or "payment.failed"

        [JsonPropertyName("created_at")]
        public long CreatedAt { get; set; }

        [JsonPropertyName("data")]
        public PaymentData? Data { get; set; }
    }

    public class PaymentData
    {
        [JsonPropertyName("id")]
        public string? Id { get; set; }

        [JsonPropertyName("attributes")]
        public PaymentAttributes? Attributes { get; set; }
    }

    public class PaymentAttributes
    {
        [JsonPropertyName("amount")]
        public int Amount { get; set; }

        [JsonPropertyName("currency")]
        public string? Currency { get; set; }

        [JsonPropertyName("status")]
        public string? Status { get; set; } // "paid" or "failed"

        [JsonPropertyName("payment_intent_id")]
        public string? PaymentIntentId { get; set; }
    }
}
