using ArtGallery.WebAPI.Data;
using ArtGallery.WebAPI.Interfaces;
using ArtGallery.WebAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace ArtGallery.WebAPI.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddControllers();
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors();
            services.AddScoped<ITokenService, TokenService>();

            return services;
        }
    }
}
