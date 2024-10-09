using Core.Entities;
using Core.Enums;

namespace Core.Specifications
{
    public class ArtworkSpecification : BaseSpecification<Artwork>
    {
        public ArtworkSpecification(decimal? minPrice, decimal? maxPrice, SortOrder? sort) : base(x =>
            (!minPrice.HasValue || x.Price >= minPrice.Value) &&
            (!maxPrice.HasValue || x.Price <= maxPrice.Value)
        )
        {
            switch (sort)
            {
                case SortOrder.priceAsc:
                    AddOrderBy(x => x.Price);
                    break;
                case SortOrder.priceDesc:
                    AddOrderByDescending(x => x.Price);
                    break;
                default:
                    AddOrderBy(x => x.Title);
                    break;
            }
        }
    }
}
