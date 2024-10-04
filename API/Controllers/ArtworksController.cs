using Core.Controllers;
using Core.DTOs;
using Core.Entities;
using Core.Enums;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ArtworksController(IArtworkRepository repo) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Artwork>>> GetArtworks([FromQuery] decimal? minPrice, decimal? maxPrice, SortOrder sort = SortOrder.priceAsc)
        {
            return Ok(await repo.GetArtworksAsync(minPrice, maxPrice, sort));
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Artwork>> GetArtwork(int id)
        {
            var artwork = await repo.GetArtworkByIdAsync(id);

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

            repo.AddArtwork(artwork);
            if (await repo.SaveChangesAsync())
            {
                return CreatedAtAction("GetArtwork", new { id = artwork.Id }, artwork);
            }

            return artworkDto;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateProduct(int id, Artwork artwork)
        {
            if (artwork.Id != id || !ArtworkExists(id)) return BadRequest("Cannot update this product");

            repo.UpdateArtwork(artwork);

            if (await repo.SaveChangesAsync())
            {
                return NoContent();
            }

            return BadRequest("Problem updating the product");
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteArtwork(int id)
        {
            var artwork = await repo.GetArtworkByIdAsync(id);

            if (artwork == null) return NotFound();

            repo.DeleteArtwork(artwork);

            if (await repo.SaveChangesAsync())
            {
                return NoContent();
            }

            return BadRequest("Problem deleting the product");
        }

        private bool ArtworkExists(int id)
        {
            return repo.ArtworkExists(id);
        }

    }
}
