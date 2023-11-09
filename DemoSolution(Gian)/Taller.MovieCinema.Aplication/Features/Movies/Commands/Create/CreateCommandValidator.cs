using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace Taller.MovieCinema.Aplication.Features.Movies.Commands.Create
{
    public class CreateCommandValidator : AbstractValidator<CreateCommandRequest>
    {
        public CreateCommandValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .MinimumLength(3)
                .Must(x =>
                {
                    if (x == "Chile")
                    {
                        return false;
                    }
                    return true;
                }).WithMessage("El País no puede ser Chile");
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.GenderId)
                .NotEmpty().WithMessage("Debe ingresar un género válido.")
                .GreaterThan(0).WithMessage("El género debe ser mayor a CERO.");
        }
    }
}
