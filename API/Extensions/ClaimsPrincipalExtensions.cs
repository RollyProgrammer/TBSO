using System;
using System.Security.Claims;

namespace API.Extensions;

/// <summary>
/// Provides extension methods for extracting common user information
/// from the authenticated <see cref="ClaimsPrincipal"/>.
/// </summary>
/// <remarks>
/// These extensions are typically used to simplify access to claim-based data,
/// such as retrieving the username from JWT tokens or identity cookies.
/// </remarks>
public static class ClaimsPrincipalExtensions
{
    /// <summary>
    /// Retrieves the username of the currently authenticated user.
    /// </summary>
    /// <param name="user">The <see cref="ClaimsPrincipal"/> representing the authenticated user.</param>
    /// <returns>The username string extracted from the user identity.</returns>
    /// <exception cref="UnauthorizedAccessException">
    /// Thrown when the user is not authenticated or the username cannot be retrieved.
    /// </exception>
    /// <example>
    /// Example usage:
    /// <code>
    /// var username = User.GetUsername();
    /// </code>
    /// </example>
    public static string GetUsername(this ClaimsPrincipal user)
    {
        // Retrieve the username from the user's identity.
        // If the identity is null (unauthenticated), throw an UnauthorizedAccessException.
        return user.Identity?.Name ?? throw new UnauthorizedAccessException();
    }
}
