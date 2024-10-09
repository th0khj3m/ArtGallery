using Core.Controllers;
using Core.DTOs;
using Core.Entities;
using Core.Enums;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ArtworksController(IGenericRepository<Artwork> repo) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Artwork>>> GetArtworks([FromQuery] decimal? minPrice, decimal? maxPrice, SortOrder? sort = SortOrder.priceAsc)
        {
            var spec = new ArtworkSpecification(minPrice, maxPrice, sort);
            var artworks = await repo.ListAsync(spec);

            return Ok(artworks);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Artwork>> GetArtwork(int id)
        {
            var artwork = await repo.GetByIdAsync(id);

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

            repo.Add(artwork);
            if (await repo.SaveAllAsync())
            {
                return CreatedAtAction("GetArtwork", new { id = artwork.Id }, artwork);
            }

            return artworkDto;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateProduct(int id, Artwork artwork)
        {
            if (artwork.Id != id || !ArtworkExists(id)) return BadRequest("Cannot update this product");

            repo.Update(artwork);

            if (await repo.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Problem updating the product");
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteArtwork(int id)
        {
            var artwork = await repo.GetByIdAsync(id);

            if (artwork == null) return NotFound();

            repo.Remove(artwork);

            if (await repo.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Problem deleting the product");
        }

        //[HttpGet("brands")]
        //public async Task<ActionResult<IReadOnlyList<string>>> GetBrands()
        //{
        //    var spec = new BrandListSpecification();
        //    return Ok(await repo.ListAsync(spec));
        //}

        //[HttpGet("types")]
        //public async Task<ActionResult<IReadOnlyList<string>>> GetTypes()
        //{
        //    var spec = new TypeListSpecification();
        //    return Ok(await repo.ListAsync(spec));
        //}

        private bool ArtworkExists(int id)
        {
            return repo.Exist(id);
        }

    }
}
