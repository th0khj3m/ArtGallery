using Core.Entities;
using Core.Enums;

namespace Core.Interfaces
{
    public interface IArtworkRepository
    {
        Task<IReadOnlyList<Artwork>> GetArtworksAsync(decimal? minPrice, decimal? maxPrice, SortOrder sort); //No modification needed => IReadOnlyList
        Task<Artwork?> GetArtworkByIdAsync(int id);
        void AddArtwork(Artwork artwork);
        void UpdateArtwork(Artwork artwork);
        void DeleteArtwork(Artwork artwork);
        bool ArtworkExists(int id);
        Task<bool> SaveChangesAsync();

    }
}
