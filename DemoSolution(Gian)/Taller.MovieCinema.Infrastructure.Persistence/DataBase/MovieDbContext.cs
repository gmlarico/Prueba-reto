using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Taller.MovieCinema.Aplication.Contracts.Database;
using Taller.MovieCinema.Domain.Entities;

namespace Taller.MovieCinema.Infrastructure.Persistence.DataBase
{
    public class MovieDbContext : DbContext, IApplicationDbContext
    {
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Entradas> Entradas { get; set; }
        public DbSet<CodigosPromocion> CodigosPromocion { get; set; }
        public DbSet<Gender> Genders { get; set; }
        public MovieDbContext(DbContextOptions<MovieDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return base.SaveChangesAsync(cancellationToken);

        }

    }
}
