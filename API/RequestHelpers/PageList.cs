using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers;

public class PagedList<T> : List<T>
{
    /// <summary>
    /// Gets pagination-related information such as total count, page size, and current page.
    /// </summary>
    public PaginationMetadata Metadata { get; set; }

    /// <summary>
    /// Initializes a new instance of the <see cref="PagedList{T}"/> class.
    /// </summary>
    /// <param name="items">The items for the current page.</param>
    /// <param name="count">The total number of items across all pages.</param>
    /// <param name="pageNumber">The current page number (1-based).</param>
    /// <param name="pageSize">The number of items per page.</param>
    public PagedList(List<T> items, int count, int pageNumber, int pageSize)
    {
        Metadata = new PaginationMetadata
        {
            TotalCount = count,
            PageSize = pageSize,
            CurrentPage = pageNumber,
            TotalPages = (int)Math.Ceiling(count / (double)pageSize)
        };

        AddRange(items);
    }

    /// <summary>
    /// Converts an <see cref="IQueryable{T}"/> into a <see cref="PagedList{T}"/> asynchronously.
    /// Automatically applies pagination logic using Skip() and Take().
    /// </summary>
    /// <param name="query">The queryable source to paginate.</param>
    /// <param name="pageNumber">The current page number (1-based).</param>
    /// <param name="pageSize">The number of items per page.</param>
    /// <returns>A <see cref="PagedList{T}"/> containing the requested page of data and metadata.</returns>
    public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query, int pageNumber, int pageSize)
    {
        var count = await query.CountAsync();
        var items = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedList<T>(items, count, pageNumber, pageSize);
    }
}
