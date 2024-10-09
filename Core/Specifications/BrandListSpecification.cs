using Core.Entities;

namespace Core.Specifications
{
    public class BrandListSpecification : BaseSpecification<Artwork, string>
    {
        public BrandListSpecification()
        {
            AddSelect(x => x.Brand);
            ApplyDistinct();
        }
    }
}
