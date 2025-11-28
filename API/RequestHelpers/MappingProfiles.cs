using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.RequestHelpers
{
    /// <summary>
    /// Defines AutoMapper configuration profiles for mapping between
    /// Data Transfer Objects (DTOs) and entity models.
    /// </summary>
    public class MappingProfiles : Profile
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="MappingProfiles"/> class.
        /// Configures mapping rules between DTOs and entity models.
        /// </summary>
        public MappingProfiles()
        {
            // Maps properties from CreateProductDto to Product entity
            CreateMap<CreateProductDto, Product>();

            // Maps properties from UpdateProductDto to Product entity
            CreateMap<UpdateProductDto, Product>();
        }
    }
}
