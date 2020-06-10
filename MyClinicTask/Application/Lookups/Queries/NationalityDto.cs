using AutoMapper;
using MyClinicTask.Common.Mappings;
using MyClinicTask.Domain.Entities;

namespace MyClinicTask.Application.Lookups.Queries
{
    public class NationalityDto : IMapFrom<Nationality>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<Nationality, NationalityDto>();
        }
    }
}
