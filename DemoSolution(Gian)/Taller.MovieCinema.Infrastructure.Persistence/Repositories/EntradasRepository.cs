using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Domain.Entities;
using Taller.MovieCinema.Domain.Repositories;
using Taller.MovieCinema.Infrastructure.Core.Exceptions;
using Taller.MovieCinema.Infrastructure.Persistence.DataBase;

namespace Taller.MovieCinema.Infrastructure.Persistence.Repositories
{
    public class EntradasRepository : IEntradasRepository
    {
        private readonly MovieDbContext _context;

        public EntradasRepository(MovieDbContext context)
        {
            _context = context;
        }
        public async Task AddEntradas(Entradas entradas)
        {
            _context.Entradas.Add(entradas);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateNumTicket(Movie movie)
        {
            var entity = await _context.Movies
                .FirstOrDefaultAsync(x => x.Id == movie.Id);
            if (entity == null)
            {
                throw new NotFoundException($"No se encontró la película con ID= {movie.Id}");
            }

            entity.NumTicket = movie.NumTicket;

            _context.Movies.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
