using API.Extensions;
using API.SignalR;
using Core.Controllers;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using StackExchange.Redis;
using Stripe;

namespace API.Controllers
{
    public class PaymentController(IPaymentService paymentService,
        IUnitOfWork unit, ILogger<PaymentController> logger, IConfiguration config, 
        IHubContext<NotificationHub> hubContext, IConnectionMultiplexer redis) : BaseApiController
    {
        private readonly string _whSecret = config["StripeSettings:WhSecret"]!;

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

        [HttpPost("webhook")]
        public async Task<IActionResult> StripeWebhook()
        {
             var json = await new StreamReader(Request.Body).ReadToEndAsync();

            try
            {
                var stripeEvent = ConstructStripeEvent(json);
                if (stripeEvent == null)
                {
                    logger.LogWarning("Failed to construct a valid Stripe event");
                    return BadRequest("Invalid Stripe event");
                }

                if (stripeEvent.Data.Object is not PaymentIntent intent)
                {
                    logger.LogWarning("Stripe event does not contain a PaymentIntent object");
                    return BadRequest("Invalid event data");
                }

                await HandlePaymentIntentSucceeded(intent);
                return Ok();
            }
            catch (StripeException ex)
            {
                logger.LogError(ex, "An unexpected error occurred in StripeWebhook: {Message}", ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, "Webhook error");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An unexpected error occured, {Message}", ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occured");  
            }
        }

        private async Task HandlePaymentIntentSucceeded(PaymentIntent intent)
        {
            if (intent.Status == "succeeded")
            {
                var spec = new OrderSpecification(intent.Id, true);
                var order = await unit.Repository<Core.Entities.OrderAggregate.Order>().GetEntityWithSpec(spec)
                    ?? throw new Exception("Order not found");

                if ((long)order.GetTotal() != intent.Amount)
                {
                    order.Status = OrderStatus.PaymentMismatch;
                }
                else
                {
                    order.Status = OrderStatus.PaymentReceived;
                }

                await unit.Complete();

                // SignalR (Using the ConcurrentDictionary)
                //var connectionId = NotificationHub.GetConnectionIdByEmail(order.BuyerEmail);

                //if (!string.IsNullOrEmpty(connectionId))
                //{
                //    await hubContext.Clients.Client(connectionId)
                //        .SendAsync("OrderCompleteNotification", order.ToDto());
                //}

                var db = redis.GetDatabase();
                var connectionId = await db.StringGetAsync(order.BuyerEmail);
                if (!string.IsNullOrEmpty(connectionId))
                {
                    await hubContext.Clients.Client(connectionId)
                        .SendAsync("OrderCompleteNotification", order.ToDto());
                }
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
