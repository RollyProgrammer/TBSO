namespace API.RequestHelpers
{
    /// <summary>
    /// Represents metadata for paginated API responses.
    /// This provides information about the pagination state,
    /// such as total items, page size, current page, and total pages.
    /// </summary>
    public class PaginationMetadata
    {
        /// <summary>
        /// The total number of records in the data source before pagination.
        /// </summary>
        public int TotalCount { get; set; }

        /// <summary>
        /// The number of items included per page.
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// The current page number being viewed (1-based index).
        /// </summary>
        public int CurrentPage { get; set; }

        /// <summary>
        /// The total number of pages available based on <see cref="TotalCount"/> and <see cref="PageSize"/>.
        /// </summary>
        public int TotalPages { get; set; }
    }
}
