namespace Core.Entities.OrderAggregate
{
    public class OrderItem : BaseEntity
    {
        public ArtworkItemOrdered ItemOrdered { get; set; } = null!;
        public int Price { get; set; }
        public int Quantity { get; set; }
    }
}
