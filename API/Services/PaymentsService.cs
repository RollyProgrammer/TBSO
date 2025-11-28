using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace API.Services;

/// <summary>
    /// Handles all PayMongo payment-related operations, including creating payment intents,
    /// creating payment methods, and attaching methods to intents.
    /// </summary>
    public class PaymentsService
    {
        private readonly HttpClient _httpClient;
        private readonly string _secretKey;

        /// <summary>
        /// Initializes the PayMongo service with an HTTP client and configuration.
        /// </summary>
        /// <param name="httpClient">The injected <see cref="HttpClient"/> for sending requests.</param>
        /// <param name="config">The configuration object containing PayMongo settings.</param>
        public PaymentsService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _secretKey = config["PayMongoSettings:SecretKey"]
                         ?? throw new ArgumentNullException("PayMongo secret key not found");

            // Always include JSON headers for PayMongo API
            _httpClient.DefaultRequestHeaders.Accept.Clear();
            _httpClient.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json")
            );

            // Basic Authentication using the PayMongo Secret Key
            var encoded = Convert.ToBase64String(Encoding.UTF8.GetBytes(_secretKey + ":"));
            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Basic", encoded);
        }

        /// <summary>
        /// Sends a POST request to a specified PayMongo API endpoint with the given request body.
        /// </summary>
        /// <param name="url">The endpoint URL to send the request to.</param>
        /// <param name="body">The object payload to serialize into JSON.</param>
        /// <returns>The raw JSON response as a string.</returns>
        private async Task<string> PostAsync(string url, object body)
        {
            var json = JsonSerializer.Serialize(body);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync(url, content);

            // Throws an exception if the API returns a non-success status code
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsStringAsync();
        }

        /// <summary>
        /// Creates a new payment intent in PayMongo.
        /// </summary>
        /// <param name="amount">The total payment amount in PHP (will be converted to long).</param>
        /// <param name="description">A short description of the payment purpose.</param>
        /// <returns>The PayMongo API response as a JSON string.</returns>
        public async Task<string> CreatePaymentIntent(decimal amount, string description)
        {
            var body = new
            {
                data = new
                {
                    attributes = new
                    {
                        amount = (long)amount,
                        payment_method_allowed = new[] { "card", "gcash", "grab_pay", "paymaya" },
                        payment_method_options = new
                        {
                            card = new { request_three_d_secure = "any" }
                        },
                        currency = "PHP",
                        capture_type = "automatic",
                        description,
                        statement_descriptor = "My Shop"
                    }
                }
            };

            return await PostAsync("https://api.paymongo.com/v1/payment_intents", body);
        }

        /// <summary>
        /// Creates a new payment method (e.g., card details) in PayMongo.
        /// </summary>
        /// <param name="cardNumber">The credit card number.</param>
        /// <param name="expMonth">Expiration month (MM).</param>
        /// <param name="expYear">Expiration year (YYYY).</param>
        /// <param name="cvc">Card security code.</param>
        /// <param name="name">Cardholder's name.</param>
        /// <param name="email">Cardholder's email.</param>
        /// <param name="phone">Cardholder's phone number.</param>
        /// <returns>The PayMongo API response as a JSON string.</returns>
        public async Task<string> CreatePaymentMethod(
            string cardNumber,
            int expMonth,
            int expYear,
            string cvc,
            string name,
            string email,
            string phone)
        {
            var body = new
            {
                data = new
                {
                    attributes = new
                    {
                        details = new
                        {
                            card_number = cardNumber,
                            exp_month = expMonth,
                            exp_year = expYear,
                            cvc = cvc
                        },
                        billing = new { name, email, phone },
                        type = "card"
                    }
                }
            };

            return await PostAsync("https://api.paymongo.com/v1/payment_methods", body);
        }

        /// <summary>
        /// Attaches a payment method to an existing payment intent.
        /// </summary>
        /// <param name="intentId">The PayMongo payment intent ID.</param>
        /// <param name="paymentMethodId">The PayMongo payment method ID.</param>
        /// <param name="returnUrl">The URL to redirect the user after payment completion.</param>
        /// <returns>The PayMongo API response as a JSON string.</returns>
        public async Task<string> AttachPaymentMethod(string intentId, string paymentMethodId, string returnUrl)
        {
            var body = new
            {
                data = new
                {
                    attributes = new
                    {
                        payment_method = paymentMethodId,
                        return_url = returnUrl
                    }
                }
            };

            return await PostAsync($"https://api.paymongo.com/v1/payment_intents/{intentId}/attach", body);
        }
    }