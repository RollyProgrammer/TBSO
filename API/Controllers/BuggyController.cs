using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

/// <summary>
/// Controller used for intentionally triggering various types of API errors.
/// Helps developers test error handling, middleware responses, and client behavior.
/// </summary>
public class BuggyController : BaseApiController
{
    /// <summary>
    /// Simulates a "Not Found" (404) response.
    /// </summary>
    /// <returns>Returns 404 Not Found.</returns>
    [HttpGet("not-found")]
    public IActionResult GetNotFound()
    {
        return NotFound();
    }

    /// <summary>
    /// Simulates a "Bad Request" (400) response.
    /// </summary>
    /// <returns>Returns 400 Bad Request with a message.</returns>
    [HttpGet("bad-request")]
    public IActionResult GetBadRequest()
    {
        return BadRequest("That is not a good request");
    }

    /// <summary>
    /// Simulates an "Unauthorized" (401) response.
    /// </summary>
    /// <returns>Returns 401 Unauthorized.</returns>
    [HttpGet("unauthorized")]
    public IActionResult GetUnauthorised()
    {
        return Unauthorized();
    }

    /// <summary>
    /// Simulates a validation error (400) response with multiple model state issues.
    /// Useful for testing front-end validation error handling.
    /// </summary>
    /// <returns>Returns 400 Validation Problem with multiple errors.</returns>
    [HttpGet("validation-error")]
    public IActionResult GetValidationError()
    {
        ModelState.AddModelError("Problem1", "This is the first error");
        ModelState.AddModelError("Problem2", "This is the second error");
        return ValidationProblem();
    }

    /// <summary>
    /// Simulates a server-side exception (500 Internal Server Error).
    /// Useful for testing global exception middleware.
    /// </summary>
    /// <returns>Throws an unhandled exception.</returns>
    [HttpGet("server-error")]
    public IActionResult GetServerError()
    {
        throw new Exception("This is a server error");
    }
}
