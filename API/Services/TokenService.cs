using Core.Interfaces;
using Core.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Core.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;

        public TokenService(IConfiguration config)
        {
            _config = config;
        }

        public string CreateToken(User user)
        {
            var tokenKey = _config["TokenKey"] ?? throw new Exception("Cannot access tokenKey from appsettings");
            if (tokenKey.Length < 64) throw new Exception("Your tokenKey needs to be longer");

            // Creating a symmetric security key (encrypt and decrypt) using a secret key (tokenKey)
            // The secret key is being encoded to the bytes using UTF-8 encoding
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, user.UserName)
            };

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays
                (7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            // Using the token handler to create a JWT token based on the token descriptor
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
