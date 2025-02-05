using Core.Entities;
using Microsoft.AspNetCore.Identity;
using System.Reflection;
using System.Text.Json;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any(x => x.UserName == "admin@test.com"))
            {
                var user = new AppUser
                {
                    UserName = "admin@test.com",
                    Email = "admin@test.com",
                };

                await userManager.CreateAsync(user, "TooWild147258@");
                await userManager.AddToRoleAsync(user, "Admin");
            }

            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            if (!context.Artworks.Any())
            {
                var artworksData = await File
                    .ReadAllTextAsync(path + @"/Data/SeedData/artworks.json");

                var artworks = JsonSerializer.Deserialize<List<Artwork>>(artworksData);

                if (artworks == null) return;

                context.Artworks.AddRange(artworks);

                await context.SaveChangesAsync();
            }

            if (!context.DeliveryMethods.Any())
            {
                var dmData = await File.ReadAllTextAsync(path + @"/Data/SeedData/delivery.json");

                var methods = JsonSerializer.Deserialize<List<DeliveryMethod>>(dmData);

                if (methods == null) return;

                context.DeliveryMethods.AddRange(methods);

                await context.SaveChangesAsync();
            }
        }
    }
}
