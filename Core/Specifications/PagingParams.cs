namespace Core.Specifications
{
    public class PagingParams
    {
        private const int MaxPageSize = 50;
        public int PageIndex { get; set; } = 1; // Current page number
        private int _pageSize = 6; // Number of items per page

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }
}
