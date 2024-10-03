using Core.Controllers;
using Core.DTOs;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ArtworksController(StoreContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Artwork>>> GetArtworks()
        {
            return await context.Artworks.ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Artwork>> GetArtwork(int id)
        {
            var artwork = await context.Artworks.FindAsync(id);

            if (artwork == null) return NotFound();

            return artwork;
        }

        [HttpPost]
        public async Task<ActionResult<ArtworkDto>> CreateArtwork(ArtworkDto artworkDto)
        {
            var artwork = new Artwork
            {
                Title = artworkDto.Title,
                Description = artworkDto.Description,
                Price = artworkDto.Price,
                ImageUrl = artworkDto.ImageUrl,
                QuantityInStock = artworkDto.QuantityInStock,
            };

            context.Artworks.Add(artwork);
            await context.SaveChangesAsync();
            return artworkDto;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateProduct(int id, Artwork artwork)
        {
            if (artwork.Id != id || !ArtworkExists(id)) return BadRequest("Cannot update this product");

            context.Entry(artwork).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteArtwork(int id)
        {
            var artwork = await context.Artworks.FindAsync(id);
            if (artwork == null) return NotFound();
            context.Artworks.Remove(artwork);
            await context.SaveChangesAsync();
            return NoContent();
        }

        private bool ArtworkExists(int id)
        {
            return context.Artworks.Any(x => x.Id == id);
        }










    }
}
