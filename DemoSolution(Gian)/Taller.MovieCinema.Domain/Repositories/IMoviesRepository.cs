using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Domain.Entities;

namespace Taller.MovieCinema.Domain.Repositories
{
    public interface IMoviesRepository
    {
        Task<List<Movie>> FindAll();
        Task<Movie> FindById(int id);

        IEnumerable<Movie> FindFunc(Func<Movie, bool> filter);
        Task<List<Movie>> Find(Expression<Func<Movie, bool>> filter);
        Task Update(Movie movie);
        Task Add(Movie movie);      
        Task Delete(int id);
    }
}
