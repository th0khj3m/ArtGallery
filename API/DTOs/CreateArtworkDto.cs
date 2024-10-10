using System.ComponentModel.DataAnnotations;

namespace Core.DTOs
{
    public class CreateArtworkDto
    {
        [Required]
        public required string Title { get; set; } = string.Empty;

        public required string Description { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
        public decimal Price { get; set; }

        [Required]
        public string ImageUrl { get; set; } = string.Empty;

        [Range(1, int.MaxValue, ErrorMessage = "Quantity in stock must be at least 1")]
        public int QuantityInStock { get; set; }
    }
}
