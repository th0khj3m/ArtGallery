using Core.Entities;
using Core.Enums;

namespace Core.Specifications
{
    public class ArtworkSpecification : BaseSpecification<Artwork>
    {
        public ArtworkSpecification(ArtworkSpecParams specParams) : base(x =>
            (string.IsNullOrEmpty(specParams.Search) || x.Title.ToLower().Contains(specParams.Search)) &&
            (!specParams.MinPrice.HasValue || x.Price >= specParams.MinPrice.Value) &&
            (!specParams.MaxPrice.HasValue || x.Price <= specParams.MaxPrice.Value)
        )
        {
            ApplyPaging(specParams.PageSize * (specParams.PageIndex - 1), specParams.PageSize);

            switch (specParams.Sort)
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
