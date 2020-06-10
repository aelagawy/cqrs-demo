using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using MyClinicTask.Common.Interfaces;

namespace MyClinicTask.Application.Lookups.Queries
{
    public class GetNationalitiesQuery : IRequest<NationalitiesVm>
    {
        public class GetNationalitiesQueryHandler : IRequestHandler<GetNationalitiesQuery, NationalitiesVm>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public GetNationalitiesQueryHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<NationalitiesVm> Handle(GetNationalitiesQuery request, CancellationToken cancellationToken)
            {
                var vm = new NationalitiesVm();

                vm.List = await _context.Nationalities
                    .ProjectTo<NationalityDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return vm;
            }
        }
    }
}
