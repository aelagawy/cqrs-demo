using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyClinicTask.Domain.Entities;

namespace MacSys.Infrastructure.Persistence.Configurations
{
    public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.Property(x => x.FirstName)
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(x => x.MiddleName)
               .HasMaxLength(200);

            builder.Property(x => x.LastName)
                .HasMaxLength(200)
                .IsRequired();
        }
    }
}
