using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Aplication.Contracts.Services;
using Taller.MovieCinema.Infrastructure.Services;

namespace Taller.MovieCinema.Infrastructure
{
    public static class DependecyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddScoped<IStorageService, LocalStorageService>();
            return services;
        }
    }
}
