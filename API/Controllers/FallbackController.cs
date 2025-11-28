using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

/// <summary>
/// Handles fallback routing for Single Page Applications (SPAs).
/// When no API endpoint matches the request, this controller serves the client-side entry point (index.html).
/// </summary>
[AllowAnonymous]
public class FallbackController : Controller
{
    /// <summary>
    /// Returns the main <c>index.html</c> file to allow client-side routing to handle navigation.
    /// This ensures React, Angular, or other front-end frameworks can manage routes not handled by the API.
    /// </summary>
    /// <returns>The physical <c>index.html</c> file from the wwwroot directory.</returns>
    public IActionResult Index()
    {
        return PhysicalFile(
            Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"),
            "text/html");
    }
}
