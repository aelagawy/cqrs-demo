using System.Collections.Generic;

namespace MyClinicTask.Application.Employees.Queries
{
    public class EmployeesVm
    {
        public EmployeesVm()
        {
            List = new List<EmployeeDto>();
        }
        public List<EmployeeDto> List { get; set; }
        public int RecordsCount { get; set; }
    }
}
