using System.Text.Json;
using API.RequestHelpers;
using Microsoft.Net.Http.Headers;

namespace API.Extensions;

/// <summary>
/// Provides extension methods for enhancing HTTP responses with custom headers.
/// </summary>
/// <remarks>
/// Commonly used for adding pagination metadata to API responses so clients can
/// easily handle paginated results without embedding pagination info inside the payload.
/// </remarks>
public static class HttpExtensions
{
    /// <summary>
    /// Adds a pagination header to the HTTP response, allowing clients to access
    /// pagination details such as current page, total pages, and total count.
    /// </summary>
    /// <param name="response">The <see cref="HttpResponse"/> object to modify.</param>
    /// <param name="metadata">
    /// The <see cref="PaginationMetadata"/> object containing pagination details.
    /// </param>
    /// <remarks>
    /// The metadata is serialized into JSON and appended to the "Pagination" header.
    /// The <see cref="HeaderNames.AccessControlExposeHeaders"/> header is also set
    /// to ensure the client (e.g., browser) can access the custom header.
    /// </remarks>
    /// <example>
    /// Example usage inside a controller:
    /// <code>
    /// Response.AddPaginationHeader(new PaginationMetadata(totalItems, pageNumber, pageSize));
    /// </code>
    /// </example>
    public static void AddPaginationHeader(this HttpResponse response, PaginationMetadata metadata)
    {
        // Serialize pagination data using camelCase for client-side consistency.
        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

        // Add the pagination metadata as a custom response header.
        response.Headers.Append("Pagination", JsonSerializer.Serialize(metadata, options));

        // Ensure the custom header can be accessed by client-side JavaScript (CORS-safe).
        response.Headers.Append(HeaderNames.AccessControlExposeHeaders, "Pagination");
    }
}
