using Microsoft.EntityFrameworkCore.Migrations;

namespace MyClinicTask.Infrastructure.Persistence.Migrations
{
    public partial class SeedDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var script = @" insert into Nationalities([Name])
                            values('Egyptian'),('Saudi'),('Syrian'),('Yemeni'),('Iraqi')

                            insert into Positions([Title])
                            values('Manager'), ('Engineer'), ('Designer'), ('Teacher'), ('Secretary')

                            insert into Employees(FirstName, MiddleName, LastName, DateOfBirth, PositionId, NationalityId, Salary)
                            values('Mohammed', '', 'Ali', getdate(), floor(rand()*(5-1+1))+1, floor(rand()*(5-1+1))+1, floor(rand()*(10000-1+1))+1000),
                            ('Ahmed', '', 'Waleed', getdate(), floor(rand()*(5-1+1))+1, floor(rand()*(5-1+1))+1, floor(rand()*(10000-1+1))+1000),
                            ('Ibrahim', '', 'Jamal', getdate(), floor(rand()*(5-1+1))+1, floor(rand()*(5-1+1))+1, floor(rand()*(10000-1+1))+1000),
                            ('Mariam', '', 'Youssef', getdate(), floor(rand()*(5-1+1))+1, floor(rand()*(5-1+1))+1, floor(rand()*(10000-1+1))+1000),
                            ('Mostafa', '', 'Sayed', getdate(), floor(rand()*(5-1+1))+1, floor(rand()*(5-1+1))+1, floor(rand()*(10000-1+1))+1000),
                            ('Dina', '', 'Fadel', getdate(), floor(rand()*(5-1+1))+1, floor(rand()*(5-1+1))+1, floor(rand()*(10000-1+1))+1000),
                            ('Abdullah', '', 'Mohammed', getdate(), floor(rand()*(5-1+1))+1, floor(rand()*(5-1+1))+1, floor(rand()*(10000-1+1))+1000),
                            ('Mostafa', '', 'Yasser', getdate(), floor(rand()*(5-1+1))+1, floor(rand()*(5-1+1))+1, floor(rand()*(10000-1+1))+1000),
                            ('Yasser', '', 'Alaa', getdate(), floor(rand()*(5-1+1))+1, floor(rand()*(5-1+1))+1, floor(rand()*(10000-1+1))+1000),
                            ('Heba', '', 'Ali', getdate(), floor(rand()*(5-1+1))+1, floor(rand()*(5-1+1))+1, floor(rand()*(10000-1+1))+1000)";

            migrationBuilder.Sql(script);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
