using System;

namespace MyClinicTask.Domain.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int NationalityId { get; set; }
        public virtual Nationality Nationality { get; set; }
        public int PositionId { get; set; }
        public virtual Position Position { get; set; }
        public double Salary { get; set; }
    }
}