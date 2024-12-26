using Core.Controllers;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace API.Controllers
{
    public class PaymentController(IPaymentService paymentService,
        IUnitOfWork unit, ILogger<PaymentController> logger) : BaseApiController
    {
        private readonly string _whSecret = "";

        [Authorize]
        [HttpPost("{cartId}")]
        public async Task<ActionResult<ShoppingCart>> CreateOrUpdatePaymentIntent(string cartId)
        {
            var cart = await paymentService.CreateOrUpdatePaymentIntent(cartId);

            if (cart == null) return BadRequest("Problem with your cart");

            return Ok(cart);
        }

        [HttpGet("delivery-methods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await unit.Repository<DeliveryMethod>().ListAllAsync());
        }

        [HttpPost("webhooks")]
        public async Task<IActionResult> StripeWebhook()
        {
             var json = await new StreamReader(Request.Body).ReadToEndAsync();

            try
            {
                var stripeEvent = ConstructStripeEvent(json);
            }
            catch (Exception)
            {
                throw;
            }
        }

        private Event ConstructStripeEvent(string json)
        {
            try
            {
                return EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], 
                    _whSecret);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to construct stripe event");
                throw new StripeException("Invalid signature");
            }
        }
    }
}
