using ArtGallery.WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ArtGallery.WebAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
