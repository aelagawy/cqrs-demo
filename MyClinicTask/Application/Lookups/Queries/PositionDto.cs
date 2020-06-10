using AutoMapper;
using MyClinicTask.Common.Mappings;
using MyClinicTask.Domain.Entities;

namespace MyClinicTask.Application.Lookups.Queries
{
    public class PositionDto : IMapFrom<Position>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<Position, PositionDto>();
        }
    }
}
