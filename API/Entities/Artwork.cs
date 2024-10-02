namespace Core.Entities
{
    public class Artwork : BaseEntity
    {
        public required string Title { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public required string ImageUrl { get; set; }
        public int QuantityInStock { get; set; }
    }
}
