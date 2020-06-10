using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using MyClinicTask.Domain.Entities;
using MyClinicTask.Common.Interfaces;

namespace MyClinicTask.Application.Employees.Queries
{
    public class GetEmployeesQuery : IRequest<EmployeesVm>
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public string Sort { get; set; }
        public string Dir { get; set; }
        public string Filter { get; set; }
        public class GetEmployeesQueryHandler : IRequestHandler<GetEmployeesQuery, EmployeesVm>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public GetEmployeesQueryHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<EmployeesVm> Handle(GetEmployeesQuery request, CancellationToken cancellationToken)
            {
                var vm = new EmployeesVm();

                Expression<Func<Employee, bool>> predicate = x => string.IsNullOrEmpty(request.Filter) || x.FirstName.ToUpper().Contains(request.Filter.ToUpper());

                vm.RecordsCount = await _context.Employees.CountAsync(predicate);

                Expression<Func<Employee, string>> order;
                switch (request.Sort)
                {
                    case "position":
                        order = x => x.Position.Title;
                        break;

                    case "salary":
                        order = x => x.Salary.ToString();
                        break;

                    default:
                        order = x => x.FirstName;
                        break;
                }

                var _employees = _context.Employees
                        .AsNoTracking()
                        .Where(predicate)
                        .Include(x => x.Position);

                vm.List.AddRange(await
                        (request.Dir != "desc" ? _employees.OrderBy(order) : _employees.OrderByDescending(order))
                        .Skip(request.PageSize * request.PageIndex)
                        .Take(request.PageSize)
                        .ProjectTo<EmployeeDto>(_mapper.ConfigurationProvider)
                        .ToListAsync());

                return vm;
            }
        }
    }
}
