using System;
using API.Entities;
using Stripe;

namespace API.Services;

public class PaymentsService
{
    public PaymentsService(IConfiguration configuration)
    {
        var apiKey = configuration["StripeSettings:SecretKey"];
        if (string.IsNullOrEmpty(apiKey))
            throw new InvalidOperationException("Stripe Secret Key is missing.");
        
        StripeConfiguration.ApiKey = apiKey;
    }

    public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
    {
        var service = new PaymentIntentService();

        var subtotal = basket.Items.Sum(item => item.Quantity * item.Product.Price);
        var deliveryFee = subtotal > 1000 ? 0 : 50;
        var amount = (long)((subtotal + deliveryFee) * 100); // Stripe expects cents

        if (string.IsNullOrEmpty(basket.PaymentIntentId))
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = amount,
                Currency = "usd",
                PaymentMethodTypes = new List<string> { "card" }
            };
            return await service.CreateAsync(options);
        }
        else
        {
            var options = new PaymentIntentUpdateOptions
            {
                Amount = amount
            };
            await service.UpdateAsync(basket.PaymentIntentId, options);
            return await service.GetAsync(basket.PaymentIntentId); // Return updated intent
        }
    }
}
