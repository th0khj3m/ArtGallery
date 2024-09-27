using System.ComponentModel.DataAnnotations;

namespace ArtGallery.WebAPI.DTOs
{
    public class LoginDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public LoginDto(string username, string password)
        {
            Username = username ?? throw new ArgumentNullException(nameof(username), "Username is required");
            Password = password ?? throw new ArgumentNullException(nameof(password), "Password");
        }
    }
}
