using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Aplication.Features.Movies;
using Taller.MovieCinema.Aplication.Features_applications;
using Taller.MovieCinema.Infrastructure.Core;
using FluentValidation;
using System.Reflection;
using Taller.MovieCinema.Aplication.Features.Movies.Commands.Create;

namespace Taller.MovieCinema.Aplication
{
    public static class DependencyInjection
    {

        public static void AddApplication(this IServiceCollection services)
        {
            //METODOS NORMALES SIN CQRS
            services.AddScoped<IMoviesApplication, MoviesApplication>();
            services.AddScoped<IFindMovieByGenderUseCase, FindMovieByGenderUseCase>();

            //METODOS CQRS
            services.AddCommandQueries();

            //METODOS CQRS CON MediatR
            services.AddMediatR(opt => opt.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

            //METODOS IMPLEMENTACION DE VALIDACIONES A LAS CLASES
            services.AddValidatorsFromAssembly(typeof(CreateCommandValidator).Assembly);

            //IMPLEMENTACION DE MAPPERS
            services.AddAutoMapper(typeof(CreateCommandRequest).Assembly);

        }
    }
}
