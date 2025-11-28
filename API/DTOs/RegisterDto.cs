using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

/// <summary>
/// Data Transfer Object (DTO) used for user registration.
/// Contains the necessary credentials required to create a new account.
/// </summary>
public class RegisterDto
{
    /// <summary>
    /// The user's email address used as the primary login credential.
    /// Must be a valid email format.
    /// </summary>
    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// The password chosen by the user for account authentication.
    /// Should meet the password policy (e.g., minimum length, complexity).
    /// </summary>
    [Required(ErrorMessage = "Password is required.")]
    public required string Password { get; set; }
}
