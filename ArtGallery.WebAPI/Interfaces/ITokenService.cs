using ArtGallery.WebAPI.Models;

namespace ArtGallery.WebAPI.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
