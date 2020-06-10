using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using MyClinicTask.Common.Interfaces;

namespace MyClinicTask.Application.Lookups.Queries
{
    public class GetPositionsQuery : IRequest<PositionsVm>
    {
        public class GetPositionsQueryHandler : IRequestHandler<GetPositionsQuery, PositionsVm>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public GetPositionsQueryHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<PositionsVm> Handle(GetPositionsQuery request, CancellationToken cancellationToken)
            {
                var vm = new PositionsVm();

                vm.List = await _context.Positions
                    .ProjectTo<PositionDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return vm;
            }
        }
    }
}
