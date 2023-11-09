using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Domain.Entities;
using Taller.MovieCinema.Domain.Repositories;
using Taller.MovieCinema.Infrastructure.Persistence.DataBase;
using Taller.MovieCinema.Infrastructure.Core.Exceptions;


namespace Taller.MovieCinema.Infrastructure.Persistence.Repositories
{
    public class MoviesRepository: IMoviesRepository
    {
        private readonly MovieDbContext _context;

        public MoviesRepository(MovieDbContext context)
        {
            _context = context;
        }

        public async Task Add(Movie movie)
        {
            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();
        }
        
        public async Task Delete(int id)
        {
            var movie = await _context.Movies
                .FirstOrDefaultAsync(x => x.Id == id) ?? throw new NotFoundException($"No se encontró la película con ID= {id}");
            _context.Movies.Remove(movie!);
            await _context.SaveChangesAsync();
        }

        public IEnumerable<Movie> FindFunc(Func<Movie, bool> filter)
        {
            return _context.Movies.Where(filter);
        }

        public async Task<List<Movie>> Find(Expression<Func<Movie, bool>> filter)
        {
            return await _context.Movies
                .Include(g => g.Gender)
                .Where(filter)
                .ToListAsync();
        }

        public async Task<List<Movie>> FindAll()
        {
            return await _context.Movies.Include(x => x.Gender).ToListAsync();
        }

        public async Task<Movie> FindById(int id)
        {
            var movie = await _context.Movies
                .Include("Gender")
                .FirstOrDefaultAsync(x => x.Id == id);

            if (movie == null)
            {
                throw new NotFoundException($"No se encontró la película con ID= {id}");
            }

            return movie;
        }

        public async Task Update(Movie movie)
        {
            var entity = await _context.Movies
                .FirstOrDefaultAsync(x => x.Id == movie.Id);
            if (entity == null)
            {
                throw new NotFoundException($"No se encontró la película con ID= {movie.Id}");
            }

            entity.Description = movie.Description;
            entity.Name = movie.Name;
            entity.GenderId = movie.GenderId;
            entity.ImageUrl = movie.ImageUrl;

            _context.Movies.Update(entity);
            await _context.SaveChangesAsync();
        }

    }
}
