using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Domain.Entities;

namespace Taller.MovieCinema.Aplication.Contracts.Database
{
    public interface IApplicationDbContext
    {
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Gender> Genders { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
