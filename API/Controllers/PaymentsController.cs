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

/// <summary>
/// Manages payment processing using the PayMongo API.
/// Handles creation of payment intents, webhook callbacks, and method attachment.
/// </summary>
public class PaymentsController(PaymentsService paymentsService, StoreContext context) : BaseApiController
{
    /// <summary>
    /// Creates or updates a PayMongo payment intent for the current user's basket.
    /// This ensures that each basket is tied to a unique payment session.
    /// </summary>
    /// <returns>
    /// Returns an updated <see cref="BasketDto"/> containing the PayMongo client key and intent ID.
    /// </returns>
    [Authorize]
    [HttpPost("intent")]
    public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
    {
        var basket = await context.Baskets.GetBasketWithItems(Request.Cookies["basketId"]);

        if (basket == null)
            return BadRequest("Problem with the basket");

        // 🔹 Create a payment intent in PayMongo
        var intentJson = await paymentsService.CreatePaymentIntent(
            basket.Items.Sum(i => i.Quantity * i.Product.Price),
            $"Basket {basket.Id}"
        );

        // Parse intent response from PayMongo
        var intent = System.Text.Json.JsonDocument.Parse(intentJson)
            .RootElement.GetProperty("data");

        var intentId = intent.GetProperty("id").GetString();
        var clientKey = intent.GetProperty("attributes").GetProperty("client_key").GetString();

        // 🔹 Store PayMongo intent references in the basket
        basket.PaymentIntentId ??= intentId;
        basket.ClientSecret ??= clientKey;

        if (context.ChangeTracker.HasChanges())
        {
            var result = await context.SaveChangesAsync() > 0;
            if (!result)
                return BadRequest("Problem updating basket with intent");
        }

        return basket.ToDto();
    }

    /// <summary>
    /// Receives webhook events from PayMongo and updates order statuses accordingly.
    /// </summary>
    /// <param name="webhook">The webhook payload sent by PayMongo containing payment details and status.</param>
    /// <returns>
    /// Returns <see cref="OkResult"/> if processed successfully,
    /// or <see cref="BadRequestResult"/> if payload is invalid.
    /// </returns>
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

        if (order == null)
            return NotFound();

        // 🔹 Update order status based on PayMongo event type
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

    /// <summary>
    /// Creates a test payment method directly through the PayMongo API.
    /// ⚠️ For demo/testing purposes only. In production, this must be handled via the frontend (client-side).
    /// </summary>
    /// <returns>
    /// Returns a JSON response from PayMongo containing the created payment method details.
    /// </returns>
    [Authorize]
    [HttpPost("method")]
    public async Task<IActionResult> CreatePaymentMethod()
    {
        // ⚠️ WARNING: For demo use only. Never handle raw card data server-side in production.
        var result = await paymentsService.CreatePaymentMethod(
            "4343434343434345", 12, 29, "123",
            "Test", "test@test.com", "09123456789"
        );

        return Ok(result);
    }

    /// <summary>
    /// Attaches an existing PayMongo payment method to a payment intent to complete payment authorization.
    /// </summary>
    /// <param name="dto">The DTO containing the payment intent ID and payment method ID to attach.</param>
    /// <returns>
    /// Returns PayMongo's API response containing the updated payment intent information.
    /// </returns>
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
