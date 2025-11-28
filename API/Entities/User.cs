using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    /// <summary>
    /// Represents an application user within the system.
    /// Inherits from <see cref="IdentityUser"/> to integrate with ASP.NET Core Identity for authentication and authorization.
    /// </summary>
    public class User : IdentityUser
    {
        /// <summary>
        /// Foreign key referencing the user's associated address record.
        /// </summary>
        public int? AddressId { get; set; }

        /// <summary>
        /// Navigation property representing the user's address.
        /// Optional, since not all users are required to have a stored address.
        /// </summary>
        public Address? Address { get; set; }
    }
}
