using Core.Enums;

namespace Core.Specifications
{
    public class ArtworkSpecParams : PagingParams
    {
        private decimal? _minPrice;

        public decimal? MinPrice
        {
            get { return _minPrice; }
            set { _minPrice = value; }

            //set { _brands = value.SelectMany(x => x.Split(",", StringSplitOptions.RemoveEmptyEntries)).ToList(); } // 
        }

        private decimal? _maxPrice;

        public decimal? MaxPrice
        {
            get { return _maxPrice; }
            set { _maxPrice = value; }
        }

        public SortOrder? Sort { get; set; }

        private string? _search;

        public string Search
        {
            get { return _search ?? ""; }
            set { _search = value.ToLower(); }
        }

    }
}
