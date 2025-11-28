using API.RequestHelpers;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace API.Services
{
    /// <summary>
    /// Provides functionality for uploading and deleting images using the Cloudinary service.
    /// </summary>
    public class ImageService
    {
        private readonly Cloudinary _cloudinary;

        /// <summary>
        /// Initializes a new instance of the <see cref="ImageService"/> class
        /// using Cloudinary configuration from dependency injection.
        /// </summary>
        /// <param name="config">Cloudinary API configuration containing the CloudName, ApiKey, and ApiSecret.</param>
        public ImageService(IOptions<CloudinarySettings> config)
        {
            var acc = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(acc);
        }

        /// <summary>
        /// Uploads an image file to Cloudinary asynchronously.
        /// </summary>
        /// <param name="file">The image file to upload, provided as an <see cref="IFormFile"/>.</param>
        /// <returns>
        /// An <see cref="ImageUploadResult"/> containing details about the uploaded image,
        /// such as the public ID, URL, and upload status.
        /// </returns>
        public async Task<ImageUploadResult> AddImageAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();

            // Proceed only if the file contains data
            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();

                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Folder = "rs-course" // Target folder in Cloudinary
                };

                uploadResult = await _cloudinary.UploadAsync(uploadParams);
            }

            return uploadResult;
        }

        /// <summary>
        /// Deletes an image from Cloudinary based on its public ID.
        /// </summary>
        /// <param name="publicId">The unique Cloudinary public ID of the image to be deleted.</param>
        /// <returns>
        /// A <see cref="DeletionResult"/> object indicating whether the deletion was successful.
        /// </returns>
        public async Task<DeletionResult> DeleteImageAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result;
        }
    }
}
