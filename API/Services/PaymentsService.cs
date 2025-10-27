using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace API.Services;

public class PaymentsService
{
    private readonly HttpClient _httpClient;
    private readonly string _secretKey;

    public PaymentsService(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _secretKey = config["PayMongoSettings:SecretKey"]
                     ?? throw new ArgumentNullException("PayMongo secret key not found");

        // Always include headers
        _httpClient.DefaultRequestHeaders.Accept.Clear();
        _httpClient.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json")
        );

        // Basic auth (secret key only)
        var encoded = Convert.ToBase64String(Encoding.UTF8.GetBytes(_secretKey + ":"));
        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Basic", encoded);
    }

    private async Task<string> PostAsync(string url, object body)
    {
        var json = JsonSerializer.Serialize(body);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        var response = await _httpClient.PostAsync(url, content);

        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    // 🔹 Create a Payment Intent
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

    // 🔹 Create a Payment Method
    public async Task<string> CreatePaymentMethod(string cardNumber, int expMonth, int expYear, string cvc, string name, string email, string phone)
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

    //  Attach Payment Method to Payment Intent
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
