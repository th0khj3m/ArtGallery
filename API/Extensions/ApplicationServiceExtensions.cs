using Infrastructure.Services;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;
using System.Text.Json.Serialization;
using StackExchange.Redis;

namespace Core.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddControllers().AddJsonOptions(opt =>
            {
                opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });
            services.AddDbContext<StoreContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });
            //services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IArtworkRepository, ArtworkRepository>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddCors();
            services.AddSingleton<IConnectionMultiplexer>(provider =>
            {
                var connString = config.GetConnectionString("Redis") ?? throw new Exception("Cannot get redis connection string");
                var configuration = ConfigurationOptions.Parse(connString, true);
                return ConnectionMultiplexer.Connect(configuration);
            });
            services.AddSingleton<ICartService, CartService>();

            return services;
        }
    }
}
