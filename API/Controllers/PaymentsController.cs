using API.Data;
using API.DTOs;
using API.DTOs.Paymongo;
using API.Entities.OderAggregate;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class PaymentsController(PaymentsService paymentsService, StoreContext context) : BaseApiController
{
    [Authorize]
    [HttpPost("intent")]
    public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
    {
        var basket = await context.Baskets.GetBasketWithItems(Request.Cookies["basketId"]);
        
        if (basket == null) return BadRequest("Problem with the basket");

        // create payment intent in PayMongo
        var intentJson = await paymentsService.CreatePaymentIntent(
            basket.Items.Sum(i => i.Quantity * i.Product.Price),
            $"Basket {basket.Id}"
        );

        var intent = System.Text.Json.JsonDocument.Parse(intentJson)
            .RootElement.GetProperty("data");

        var intentId = intent.GetProperty("id").GetString();
        var clientKey = intent.GetProperty("attributes").GetProperty("client_key").GetString();

        // store intent reference in basket
        basket.PaymentIntentId ??= intentId;
        basket.ClientSecret ??= clientKey;

        if (context.ChangeTracker.HasChanges())
        {
            var result = await context.SaveChangesAsync() > 0;
            if (!result) return BadRequest("Problem updating basket with intent");
        }

        return basket.ToDto();
    }

    [AllowAnonymous]
    [HttpPost("webhook")]
    public async Task<ActionResult> PaymongoWebhook([FromBody] PaymongoWebhookEvent webhook)
    {
        if (webhook?.Data?.Attributes == null)
            return BadRequest("Invalid webhook payload");

        var eventType = webhook.Data.Attributes.Type;
        var paymentIntentId = webhook.Data.Attributes.Data?.Attributes?.PaymentIntentId;
        var status = webhook.Data.Attributes.Data?.Attributes?.Status;

        if (string.IsNullOrEmpty(paymentIntentId))
            return BadRequest("Missing PaymentIntentId");

        var order = await context.Orders
            .FirstOrDefaultAsync(x => x.PaymentIntentId == paymentIntentId);

        if (order == null) return NotFound();

        switch (eventType)
        {
            case "payment.paid" when status == "paid":
                order.OrderStatus = OrderStatus.PaymentReceived;
                break;

            case "payment.failed":
                order.OrderStatus = OrderStatus.PaymentFailed;
                break;

            default:
                order.OrderStatus = OrderStatus.PaymentMismatch;
                break;
        }

        await context.SaveChangesAsync();
        return Ok();
    }

    [Authorize]
    [HttpPost("method")]
    public async Task<IActionResult> CreatePaymentMethod()
    {
        // ⚠️ for demo only — in production, accept card details via frontend!
        var result = await paymentsService.CreatePaymentMethod(
            "4343434343434345", 12, 29, "123",
            "Test", "test@test.com", "09123456789"
        );

        return Ok(result);
    }

    [Authorize]
    [HttpPost("attach")]
    public async Task<IActionResult> AttachPaymentMethod([FromBody] AttachPaymentMethodDto dto)
    {
        var result = await paymentsService.AttachPaymentMethod(
            dto.IntentId,
            dto.PaymentMethodId,
            "https://localhost:3000/payment-result"
        );
        return Ok(result);
    }

}
