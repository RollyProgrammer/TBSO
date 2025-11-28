namespace API.RequestHelpers
{
    /// <summary>
    /// Represents pagination parameters used in API queries.
    /// Controls which page of data to retrieve and how many items per page.
    /// </summary>
    public class PaginationParams
    {
        /// <summary>
        /// The maximum number of items that can be requested per page.
        /// This limit prevents excessively large queries that could harm performance.
        /// </summary>
        private const int MaxPageSize = 50;

        /// <summary>
        /// The current page number being requested.
        /// Defaults to page 1.
        /// </summary>
        public int PageNumber { get; set; } = 1;

        /// <summary>
        /// Backing field for <see cref="PageSize"/>.
        /// </summary>
        private int _pageSize = 8;

        /// <summary>
        /// The number of items to include per page.
        /// Automatically capped at <see cref="MaxPageSize"/> to prevent abuse.
        /// </summary>
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
        }
    }
}
