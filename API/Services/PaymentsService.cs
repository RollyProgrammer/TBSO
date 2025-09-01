using API.Entities;
using Stripe;

namespace API.Services
{
    public class PaymentsService
    {
        private readonly string? _stripeSecretKey;

        public PaymentsService(IConfiguration configuration)
        {
            // Get key from environment variable first, then appsettings
            _stripeSecretKey = Environment.GetEnvironmentVariable("StripeSettings__SecretKey")
                               ?? configuration["StripeSettings:SecretKey"];

            StripeConfiguration.ApiKey = _stripeSecretKey;
        }

        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
        {
            var service = new PaymentIntentService();

            var subtotal = basket.Items.Sum(item => item.Quantity * item.Product.Price);

            var deliveryFee = subtotal > 1000 ? 0 : 50;
            var amount = (long)((subtotal + deliveryFee) * 100); // Stripe expects cents

            PaymentIntent intent;

            if (string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = amount,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> { "card" }
                };
                intent = await service.CreateAsync(options);
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = amount
                };
                intent = await service.UpdateAsync(basket.PaymentIntentId, options);
            }

            return intent;
        }
    }
}
