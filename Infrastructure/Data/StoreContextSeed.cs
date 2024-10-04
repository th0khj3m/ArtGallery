using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

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
        }
    }
}
