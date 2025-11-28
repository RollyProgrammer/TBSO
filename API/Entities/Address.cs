using System.Text.Json.Serialization;

namespace API.Entities
{
    /// <summary>
    /// Represents a physical address used for billing, shipping, or contact information.
    /// </summary>
    public class Address
    {
        /// <summary>
        /// Primary key for the address entity.
        /// Ignored during JSON serialization to prevent exposing internal database identifiers.
        /// </summary>
        [JsonIgnore]
        public int Id { get; set; }

        /// <summary>
        /// The name of the recipient or entity associated with this address.
        /// </summary>
        public required string Name { get; set; }

        /// <summary>
        /// The first line of the address (typically the street address or building number).
        /// </summary>
        public required string Line1 { get; set; }

        /// <summary>
        /// The optional second line of the address (e.g., apartment, suite, or floor).
        /// </summary>
        public string? Line2 { get; set; }

        /// <summary>
        /// The city or municipality of the address.
        /// </summary>
        public required string City { get; set; }

        /// <summary>
        /// The state, province, or region of the address.
        /// </summary>
        public required string State { get; set; }

        /// <summary>
        /// The postal or ZIP code of the address.
        /// Serialized as "postal_code" in JSON format to match API naming conventions.
        /// </summary>
        [JsonPropertyName("postal_code")]
        public required string PostalCode { get; set; }

        /// <summary>
        /// The country where the address is located.
        /// </summary>
        public required string Country { get; set; }
    }
}
