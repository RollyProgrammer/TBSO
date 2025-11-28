using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

/// <summary>
/// Handles user registration, authentication, and account-related operations.
/// </summary>
public class AccountController(SignInManager<User> signInManager) : BaseApiController
{
    /// <summary>
    /// Registers a new user with the provided email and password.
    /// </summary>
    /// <param name="registerDto">The registration details including Email and Password.</param>
    /// <returns>Returns 200 OK on success, or validation errors if registration fails.</returns>
    [HttpPost("register")]
    public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
    {
        var user = new User
        {
            Email = registerDto.Email,
            UserName = registerDto.Email,
        };

        var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
        {
            // Loop through any identity errors and add them to ModelState for detailed feedback.
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }

            return ValidationProblem();
        }

        // Assign the "Member" role by default upon successful registration.
        await signInManager.UserManager.AddToRoleAsync(user, "Member");

        return Ok();
    }

    /// <summary>
    /// Retrieves the authenticated user's information, including email and assigned roles.
    /// </summary>
    /// <returns>Returns user info (email, username, roles) or 204 if not authenticated.</returns>
    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo()
    {
        if (!User.Identity?.IsAuthenticated ?? false)
        {
            return NoContent();
        }

        var user = await signInManager.UserManager.GetUserAsync(User);

        if (user == null)
        {
            return Unauthorized();
        }

        var roles = await signInManager.UserManager.GetRolesAsync(user);

        return Ok(new
        {
            user.Email,
            user.UserName,
            Role = roles
        });
    }

    /// <summary>
    /// Logs out the currently authenticated user by clearing their authentication cookie.
    /// </summary>
    /// <returns>Returns 204 No Content when logout is successful.</returns>
    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await signInManager.SignOutAsync();
        return NoContent();
    }

    /// <summary>
    /// Creates or updates the current user's saved address.
    /// </summary>
    /// <param name="address">The address object to save or update.</param>
    /// <returns>Returns the updated address on success, or 400 if the update fails.</returns>
    [Authorize]
    [HttpPost("address")]
    public async Task<ActionResult<Address>> CreateOrUpdateAddress(Address address)
    {
        var user = await signInManager.UserManager.Users
            .Include(u => u.Address)
            .FirstOrDefaultAsync(u => u.UserName == User.Identity!.Name);

        if (user == null)
        {
            return Unauthorized();
        }

        user.Address = address;

        var result = await signInManager.UserManager.UpdateAsync(user);

        if (!result.Succeeded)
        {
            return BadRequest("Problem updating user address");
        }

        return Ok(user.Address);
    }

    /// <summary>
    /// Retrieves the currently authenticated user's saved address.
    /// </summary>
    /// <returns>Returns the saved address or 204 if no address is found.</returns>
    [Authorize]
    [HttpGet("address")]
    public async Task<ActionResult<Address>> GetSavedAddress()
    {
        var address = await signInManager.UserManager.Users
            .Where(u => u.UserName == User.Identity!.Name)
            .Select(u => u.Address)
            .FirstOrDefaultAsync();

        if (address == null)
        {
            return NoContent();
        }

        return address;
    }
}
