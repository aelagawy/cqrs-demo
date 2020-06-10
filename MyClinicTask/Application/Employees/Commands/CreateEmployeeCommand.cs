using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MyClinicTask.Common.Interfaces;
using MyClinicTask.Domain.Entities;

namespace MyClinicTask.Application.Employees.Commands
{
    public partial class CreateEmployeeCommand : IRequest<int>
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int NationalityId { get; set; }
        public int PositionId { get; set; }
        public double Salary { get; set; }
        public class CreateEmployeeCommandHandler : IRequestHandler<CreateEmployeeCommand, int>
        {
            private readonly IApplicationDbContext _context;

            public CreateEmployeeCommandHandler(IApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(CreateEmployeeCommand cmd, CancellationToken cancellationToken)
            {
                var entity = new Employee
                {
                   FirstName = cmd.FirstName,
                   MiddleName = cmd.MiddleName,
                   LastName = cmd.LastName,
                   DateOfBirth = cmd.DateOfBirth,
                   NationalityId = cmd.NationalityId,
                   PositionId = cmd.PositionId,
                   Salary = cmd.Salary
                };

                _context.Employees.Add(entity);

                return await _context.SaveChangesAsync(cancellationToken) > 0 ?
                    entity.Id : 0;
            }
        }
    }
}
