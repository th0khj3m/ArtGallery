namespace API.DTOs
{
    public class OrderItemDto
    {
        public int ArtworkId { get; set; }
        public required string ArtworkTitle { get; set; }
        public required string ImageUrl { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}