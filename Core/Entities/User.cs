using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
    public class User : BaseEntity
    {
        public required string UserName { get; set; }

        public required byte[] PasswordHash { get; set; }

        public required byte[] PasswordSalt { get; set; }

    }
}
