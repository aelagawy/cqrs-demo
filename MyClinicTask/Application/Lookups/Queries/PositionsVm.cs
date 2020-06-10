using System.Collections.Generic;

namespace MyClinicTask.Application.Lookups.Queries
{
    public class PositionsVm
    {
        public PositionsVm()
        {
            List = new List<PositionDto>();
        }
        public List<PositionDto> List { get; set; }
    }
}
