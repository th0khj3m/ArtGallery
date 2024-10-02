using System.ComponentModel.DataAnnotations;

namespace Core.DTOs
{
    public class UserDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Token { get; set; }

        public UserDto(string username, string token)
        {
            Username = username ?? throw new ArgumentNullException(nameof(username));
            Token = token;
        }
    }
}
