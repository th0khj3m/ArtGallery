using Core.Entities;

namespace Core.Specifications
{
    public class TypeListSpecification : BaseSpecification<Artwork, string>
    {
        public TypeListSpecification()
        {
            AddSelect(x => x.Type);
            ApplyDistinct();
        }
    }
}
