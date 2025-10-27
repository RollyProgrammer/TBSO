
namespace API.DTOs.Paymongo;

public class AttachPaymentMethodDto
{
    public required string IntentId { get; set; }
    public required string PaymentMethodId { get; set; }
}
