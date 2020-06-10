using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyClinicTask.Application.Employees.Commands;
using MyClinicTask.Application.Employees.Queries;

namespace MyClinicTask.API
{
    [Route("_api/[controller]")]
    public class EmployeesController : ApiController
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeVm>> Get(int id)
        {
            return await Mediator.Send(new GetEmployeeQuery() { Id = id });
        }

        [HttpGet]
        public async Task<ActionResult<EmployeesVm>> Search(int pageIndex, int pageSize, string sort, string dir, string query)
        {
            return await Mediator.Send(new GetEmployeesQuery() { PageIndex = pageIndex, PageSize = pageSize, Sort = sort, Dir = dir, Filter = query });
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateEmployeeCommand cmd)
        {
            return await Mediator.Send(cmd);
        }
    }
}
