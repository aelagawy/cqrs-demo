using System.Collections.Generic;

namespace MyClinicTask.Application.Lookups.Queries
{
    public class NationalitiesVm
    {
        public NationalitiesVm()
        {
            List = new List<NationalityDto>();
        }
        public List<NationalityDto> List { get; set; }
    }
}
