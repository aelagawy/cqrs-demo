using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using MyClinicTask.Common.Interfaces;

namespace MyClinicTask.Application.Employees.Queries
{
    public class GetEmployeeQuery : IRequest<EmployeeVm>
    {
        public int Id { get; set; }
        public class GetEmployeeQueryHandler : IRequestHandler<GetEmployeeQuery, EmployeeVm>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public GetEmployeeQueryHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<EmployeeVm> Handle(GetEmployeeQuery request, CancellationToken cancellationToken)
            {
                var vm = new EmployeeVm();

                vm.Item = await _context.Employees
                    .Where(x => request.Id != 0 && x.Id == request.Id)
                    .ProjectTo<EmployeeDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync();

                return vm;
            }
        }
    }
}
