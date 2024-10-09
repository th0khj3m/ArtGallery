using Core.Entities;
using Core.Enums;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ArtworkRepository(StoreContext context) : IArtworkRepository
    {
        public void AddArtwork(Artwork artwork)
        {
            context.Artworks.Add(artwork);
        }

        public bool ArtworkExists(int id)
        {
            return context.Artworks.Any(x => x.Id == id);
        }

        public void DeleteArtwork(Artwork artwork)
        {
            context.Artworks.Remove(artwork);
        }

        public async Task<Artwork?> GetArtworkByIdAsync(int id)
        {
            return await context.Artworks.FindAsync(id);
        }

        public async Task<IReadOnlyList<Artwork>> GetArtworksAsync(decimal? minPrice, decimal? maxPrice, SortOrder sort)
        {
            var query = context.Artworks.AsQueryable();

            if (minPrice.HasValue)
                query = query.Where(x => x.Price >= minPrice.Value);

            if (maxPrice.HasValue)
                query = query.Where(x => x.Price <= maxPrice.Value);

            query = sort switch
            {
                SortOrder.priceAsc => query.OrderBy(x => x.Price),
                SortOrder.priceDesc => query.OrderByDescending(x => x.Price),
                _ => query.OrderBy(x => x.Title),
            };

            return await query.ToListAsync();
        }

        //public async Task<IReadOnlyList<string>> GetTypesAsync()
        //{
        //    return await context.Artworks.Select(x => x.Type).Distinct().ToListAsync(); 
        //}

        public async Task<bool> SaveChangesAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void UpdateArtwork(Artwork artwork)
        {
            context.Entry(artwork).State = EntityState.Modified;
        }
    }
}
