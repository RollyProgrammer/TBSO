namespace API.RequestHelpers
{
    /// <summary>
    /// Represents a paginated list of items with pagination metadata.
    /// Inherits from <see cref="List{T}"/> to hold the paged data.
    /// </summary>
    /// <typeparam name="T">The type of elements in the list.</typeparam>
    public class PageList<T> : List<T>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PageList{T}"/> class.
        /// </summary>
        /// <param name="items">The collection of items for the current page.</param>
        /// <param name="count">The total number of items across all pages.</param>
        /// <param name="pageNumber">The current page number.</param>
        /// <param name="pageSize">The number of items per page.</param>
        public PageList(List<T> items, int count, int pageNumber, int pageSize)
        {
            // Add the provided items to the base list
            AddRange(items);

            // Set pagination metadata based on provided values
            Metadata = new PaginationMetadata
            {
                TotalCount = count,
                PageSize = pageSize,
                CurrentPage = pageNumber,
                TotalPages = (int)Math.Ceiling(count / (double)pageSize)
            };
        }

        /// <summary>
        /// Gets or sets pagination-related information.
        /// </summary>
        public PaginationMetadata Metadata { get; set; }
    }
}
