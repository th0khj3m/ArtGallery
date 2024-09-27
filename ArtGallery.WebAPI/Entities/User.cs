using Microsoft.AspNetCore.Connections.Features;
using System.ComponentModel.DataAnnotations;

namespace ArtGallery.WebAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public byte[] PasswordHash { get; set; }

        [Required]
        public byte[] PasswordSalt { get; set; }

        public User(string userName, byte[] passwordHash, byte[] passwordSalt)
        {
            UserName = userName ?? throw new ArgumentNullException(nameof(userName), "UserName is required");
            PasswordHash = passwordHash ?? throw new ArgumentNullException(nameof(passwordHash), "PasswordHash is required");
            PasswordSalt = passwordSalt ?? throw new ArgumentNullException(nameof(passwordSalt), "PasswordSalt is required");
        }
    }
}
