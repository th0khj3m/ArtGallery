using System.Net;
using Core.Entities;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace Infrastructure.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly ICartService cartService;
        private readonly IUnitOfWork unit;

        public PaymentService(IConfiguration config, ICartService cartService,
        IUnitOfWork unit)
        {
            this.cartService = cartService;
            this.unit = unit;

            var handler = new HttpClientHandler
            {
                Proxy = new WebProxy("http://proxy.fpt.vn", 80),
                UseProxy = true,
            };

            var httpClient = new HttpClient(handler);

            var stripeClient = new StripeClient(
                apiKey: config["StripeSettings:SecretKey"],
                httpClient: new SystemNetHttpClient(httpClient)
            );

            StripeConfiguration.StripeClient = stripeClient;
        }

        public async Task<ShoppingCart?> CreateOrUpdatePaymentIntent(string cartId)
        {
            var cart = await cartService.GetCartAsync(cartId);
            if (cart == null) return null;
            var shippingPrice = 0m;

            if (cart.DeliveryMethodId.HasValue)
            {
                var deliveryMethod = await unit.Repository<DeliveryMethod>().GetByIdAsync((int)cart.DeliveryMethodId);
                if (deliveryMethod == null) return null;
                shippingPrice = deliveryMethod.Price;
            }

            foreach (var item in cart.Items)
            {
                var artworkItem = await unit.Repository<Artwork>().GetByIdAsync(item.ArtworkId);
                if (artworkItem == null) return null;
                if (item.Price != artworkItem.Price)
                {
                    item.Price = artworkItem.Price;
                }
            }

            var service = new PaymentIntentService();
            PaymentIntent? intent = null;

            if (string.IsNullOrEmpty(cart.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long)cart.Items.Sum(x => x.Quantity * (x.Price)) + (long)shippingPrice,
                    Currency = "vnd",
                    PaymentMethodTypes = ["card"]
                };
                intent = await service.CreateAsync(options);
                cart.PaymentIntentId = intent.Id;
                cart.ClientSecret = intent.ClientSecret;
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = (long)cart.Items.Sum(x => x.Quantity * (x.Price)) + (long)(shippingPrice)
                };
                intent = await service.UpdateAsync(cart.PaymentIntentId, options);
            }

            await cartService.SetCartAsync(cart);
            return cart;
        }

        public async Task<string> RefundPayment(string paymentIntentId) {

            var refundOptions = new RefundCreateOptions
            {
                PaymentIntent = paymentIntentId,
            };
            
            var refundService = new RefundService();
            var result = await refundService.CreateAsync(refundOptions);

            return result.Status;

        }
    }
}