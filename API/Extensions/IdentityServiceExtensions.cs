﻿using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;

namespace Core.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            //        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //.AddJwtBearer(options =>
            //{
            //    var tokenKey = config["TokenKey"] ?? throw new Exception("TokenKey not found");
            //    options.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateIssuerSigningKey = true, // Only accept tokens has been signed
            //        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)),
            //        ValidateIssuer = false,
            //        ValidateAudience = false
            //    };
            //});

            services.AddAuthorization();
            services.AddIdentityApiEndpoints<AppUser>().
                AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<StoreContext>();
            return services;
        }
    }
}
