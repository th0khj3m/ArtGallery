﻿namespace Core.Entities
{
    public class CartItem
    {
        public int ArtworktId { get; set; }
        public required string ArtworkTitle { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public required string ImageUrl { get; set; }

    }
}
