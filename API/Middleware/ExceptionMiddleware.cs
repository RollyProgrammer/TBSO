using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

/// <summary>
/// Global middleware that handles unhandled exceptions across the application.
/// </summary>
/// <remarks>
/// This middleware catches exceptions thrown during request processing,
/// logs them, and returns a consistent JSON response to the client.
/// </remarks>
public class ExceptionMiddleware(IHostEnvironment env, ILogger<ExceptionMiddleware> logger) : IMiddleware
{
    /// <summary>
    /// Invokes the next middleware in the pipeline and handles any exceptions thrown.
    /// </summary>
    /// <param name="context">The current <see cref="HttpContext"/> representing the HTTP request.</param>
    /// <param name="next">The next middleware delegate in the pipeline.</param>
    /// <returns>A <see cref="Task"/> that represents the asynchronous operation.</returns>
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            // Proceed to the next middleware in the pipeline.
            await next(context);
        }
        catch (Exception ex)
        {
            // Handle and log any exception that occurs downstream.
            await HandleException(context, ex);
        }
    }

    /// <summary>
    /// Handles an exception by logging it and writing a JSON error response.
    /// </summary>
    /// <param name="context">The <see cref="HttpContext"/> for the current request.</param>
    /// <param name="ex">The exception that occurred during request execution.</param>
    private async Task HandleException(HttpContext context, Exception ex)
    {
        // Log exception details (message + stack trace).
        logger.LogError(ex, ex.Message);

        // Prepare the HTTP response.
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        // Create a standardized error response using ProblemDetails.
        var response = new ProblemDetails
        {
            Status = 500,
            Title = ex.Message, // Short error message
            Detail = env.IsDevelopment() 
                ? ex.StackTrace?.ToString() // Include stack trace only in development
                : null // Hide details in production
        };

        // Use camelCase naming for JSON serialization.
        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

        // Serialize the error response to JSON.
        var json = JsonSerializer.Serialize(response, options);

        // Write the serialized error response to the HTTP response stream.
        await context.Response.WriteAsync(json);
    }
}
