using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Infrastructure.Persistence.DataBase;
using Taller.MovieCinema.Infrastructure.Persistence.Repositories;
using Taller.MovieCinema.Domain.Repositories;
using Taller.MovieCinema.Aplication.Contracts.Database;

namespace Taller.MovieCinema.Infrastructure.Persistence
{
    public static class DependencyInjection
    {
        public static void AddInfrastructurePersistence(this IServiceCollection services, IConfiguration configuration) {

            services.AddDbContext<MovieDbContext>(opt => opt.UseSqlServer(configuration.GetConnectionString("Movies")));
            services.AddScoped<IMoviesRepository, MoviesRepository>();
            services.AddScoped<IPromocionesRepository, PromocionesRepository>();
            services.AddScoped<IEntradasRepository, EntradasRepository>();
            services.AddScoped<IGenerosRepository, GenerosRepository>();
            services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<MovieDbContext>());
        }
    }
}
