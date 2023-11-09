using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Infrastructure.Core.Abstractions.Commands;
using Taller.MovieCinema.Infrastructure.Core.Abstractions.Queries;

namespace Taller.MovieCinema.Infrastructure.Core
{
    public static class DependencyInjection
    {

        public static IServiceCollection AddCommandQueries(this IServiceCollection services)
        {
            var assembly = Assembly.GetCallingAssembly();


            //Commands
            services.AddSingleton<ICommandDispatcher, InMemoryCommandDispatcher>();

            services.Scan(s => s.FromAssemblies(assembly)
                .AddClasses(c => c.AssignableTo(typeof(ICommandHandler<>)))
                .AsImplementedInterfaces()
                .WithScopedLifetime());

            //Queries
            services.AddSingleton<IQueryDispatcher, InMemoryQueryDispatcher>();
            services.Scan(s => s.FromAssemblies(assembly)
                .AddClasses(c => c.AssignableTo(typeof(IQueryHandler<,>)))
                .AsImplementedInterfaces()
                .WithScopedLifetime());

            return services;
        }
    }
}
