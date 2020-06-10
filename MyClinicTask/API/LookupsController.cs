using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyClinicTask.Application.Lookups.Queries;

namespace MyClinicTask.API
{
    [Route("_api/lookups")]
    public class LookupsController : ApiController
    {
        [HttpGet]
        [Route("nationalities")]
        public async Task<ActionResult<NationalitiesVm>> GetNationalities()
        {
            return await Mediator.Send(new GetNationalitiesQuery());
        }

        [HttpGet]
        [Route("positions")]
        public async Task<ActionResult<PositionsVm>> GetPositions()
        {
            return await Mediator.Send(new GetPositionsQuery());
        }
    }
}
