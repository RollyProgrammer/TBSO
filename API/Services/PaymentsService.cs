using System;
using API.Entities;
using Stripe;

namespace API.Services;

public class PaymentsService(IConfiguration _configuration)
{
    public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
    {
        StripeConfiguration.ApiKey = _configuration["StripeSettings:SecretKey"];

        var service = new PaymentIntentService();

        var intent = new PaymentIntent();

        var subtotal = basket.Items.Sum(item => item.Quantity * item.Product.Price);

        var deliveryFee = subtotal > 1000 ? 0 : 50;
        var amount = (long)((subtotal + deliveryFee) * 100); // Stripe expects cents

        if (string.IsNullOrEmpty(basket.PaymentIntentId))
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = amount,
                Currency = "usd",
                PaymentMethodTypes = ["card"]
            };
            intent = await service.CreateAsync(options);
        }
        else
        {
            var options = new PaymentIntentUpdateOptions
            {
                Amount = amount
            };
            await service.UpdateAsync(basket.PaymentIntentId, options);
        }
        return intent;
    }
}
