using Core.Interfaces;
using Core.Services;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Core.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddControllers();
            services.AddDbContext<StoreContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors();
            services.AddScoped<ITokenService, TokenService>();

            return services;
        }
    }
}
