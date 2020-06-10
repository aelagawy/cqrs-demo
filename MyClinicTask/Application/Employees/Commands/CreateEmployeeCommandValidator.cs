using System;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using MyClinicTask.Common.Interfaces;

namespace MyClinicTask.Application.Employees.Commands
{
    public class CreateEmployeeCommandValidator : AbstractValidator<CreateEmployeeCommand>
    {
        private readonly IApplicationDbContext _context;

        public CreateEmployeeCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(x => x.FirstName)
                .NotEmpty()
                .WithMessage("First Name is required")
                .MaximumLength(200)
                .WithMessage("First Name max length is 200");

            RuleFor(x => x.MiddleName)
                .MaximumLength(200)
                .WithMessage("Middle Name max length is 200");

            RuleFor(x => x.LastName)
                .NotEmpty()
                .WithMessage("Last Name is required")
                .MaximumLength(200)
                .WithMessage("Last Name max length is 200");

            RuleFor(x => x.NationalityId)
                .NotEmpty()
                .WithMessage("Nationality Id is required")
                .MustAsync(async (x, cancellation) =>
                    x == 0 || await _context.Nationalities.SingleOrDefaultAsync(y =>
                        y.Id == x) != null)
                .WithMessage("Nationality not found");

            RuleFor(x => x.PositionId)
               .NotEmpty()
               .WithMessage("Position Id is required")
               .MustAsync(async (x, cancellation) =>
                   x == 0 || await _context.Positions.SingleOrDefaultAsync(y =>
                       y.Id == x) != null)
               .WithMessage("Position not found");

            RuleFor(x => x.DateOfBirth)
                .NotEmpty()
                .WithMessage("Date of Birth is required")
                .Must(y => y < DateTime.UtcNow)     //demo rule
                .WithMessage("Invalid DateOfBirth, must be before today");

            RuleFor(x => x.Salary)
                .NotEmpty()
                .WithMessage("Salary is required")
                .Must(y => y > 1000 && y < 10000)   //demo rule
                .WithMessage("Invalid Salary, must be between 1000 and 10000");
        }
    }
}
