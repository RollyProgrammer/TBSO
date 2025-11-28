namespace API.RequestHelpers
{
    /// <summary>
    /// Represents the configuration settings required to connect to the Cloudinary API.
    /// These values are typically stored in the appsettings.json or environment variables.
    /// </summary>
    public class CloudinarySettings
    {
        /// <summary>
        /// Gets or sets the name of the Cloudinary account (CloudName).
        /// </summary>
        public required string CloudName { get; set; }

        /// <summary>
        /// Gets or sets the API key used to authenticate with Cloudinary.
        /// </summary>
        public required string ApiKey { get; set; }

        /// <summary>
        /// Gets or sets the API secret used for secure communication with Cloudinary.
        /// </summary>
        public required string ApiSecret { get; set; }
    }
}
