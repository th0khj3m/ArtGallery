using Core.Entities;
using System.Text.Json;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context)
        {
            if (!context.Artworks.Any())
            {
                var artworksData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/artworks.json");

                var artworks = JsonSerializer.Deserialize<List<Artwork>>(artworksData);

                if (artworks == null) return;

                context.Artworks.AddRange(artworks);

                await context.SaveChangesAsync();
            }

            if (!context.DeliveryMethods.Any())
            {
                var dmData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/delivery.json");

                var methods = JsonSerializer.Deserialize<List<DeliveryMethod>>(dmData);

                if (methods == null) return;

                context.DeliveryMethods.AddRange(methods);

                await context.SaveChangesAsync();
            }
        }
    }
}
