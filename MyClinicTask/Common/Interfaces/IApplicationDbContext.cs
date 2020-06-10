using Microsoft.EntityFrameworkCore;
using MyClinicTask.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace MyClinicTask.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Employee> Employees { get; set; }
        DbSet<Nationality> Nationalities { get; set; }
        DbSet<Position> Positions { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
