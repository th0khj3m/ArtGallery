using API.DTOs;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace Core.Controllers
{
    public class ArtworksController(IUnitOfWork unit) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Artwork>>> GetArtworks([FromQuery] ArtworkSpecParams specParams)
        {
            var spec = new ArtworkSpecification(specParams);

            return await CreatePagedResult(unit.Repository<Artwork>(), spec, specParams.PageIndex, specParams.PageSize);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Artwork>> GetArtwork(int id)
        {
            var artwork = await unit.Repository<Artwork>().GetByIdAsync(id);

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

            unit.Repository<Artwork>().Add(artwork);

            if (await unit.Complete())
            {
                return CreatedAtAction("GetArtwork", new { id = artwork.Id }, artwork);
            }

            return artworkDto;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateProduct(int id, Artwork artwork)
        {
            if (artwork.Id != id || !ArtworkExists(id)) return BadRequest("Cannot update this product");

            unit.Repository<Artwork>().Update(artwork);

            if (await unit.Complete())
            {
                return NoContent();
            }

            return BadRequest("Problem updating the product");
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteArtwork(int id)
        {
            var artwork = await unit.Repository<Artwork>().GetByIdAsync(id);

            if (artwork == null) return NotFound();

            unit.Repository<Artwork>().Remove(artwork);

            if (await unit.Complete())
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
            return unit.Repository<Artwork>().Exist(id);
        }

    }
}
