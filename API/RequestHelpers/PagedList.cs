using System;

namespace API.RequestHelpers;

public class PageList<T> : List<T>
{
    public PageList(List<T> items, int count, int pageNumber, int pageSize)
    {
        Metadata = new PaginationMetadata
        {
            TotalCount = count,
            PageSize = pageSize,
            CurrentPage = pageNumber,
            TotalPages = (int)Math.Ceiling(count / (double)pageSize)
        };
    }

    public PaginationMetadata Metadata { get; set; }
}
