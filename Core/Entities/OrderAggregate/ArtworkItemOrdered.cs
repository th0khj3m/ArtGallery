namespace Core.Entities.OrderAggregate
{
    public class ArtworkItemOrdered
    {
        public int ArtworkId { get; set; }
        public required string ArtworkName { get; set; }
        public required string ImageUrl { get; set; }    

    }
}
