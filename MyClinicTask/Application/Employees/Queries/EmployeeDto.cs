using System;
using AutoMapper;
using MyClinicTask.Common.Mappings;
using MyClinicTask.Domain.Entities;

namespace MyClinicTask.Application.Employees.Queries
{
    public class EmployeeDto : IMapFrom<Employee>
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Nationality Nationality { get; set; }
        public Position Position { get; set; }
        public double Salary { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<Employee, EmployeeDto>();
        }
    }
}
