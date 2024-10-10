using Core.Enums;

namespace Core.Specifications
{
    public class ArtworkSpecParams
    {
        private const int MaxPageSize = 50;
        public int PageIndex { get; set; } = 1;
        private int _pageSize = 6;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

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
