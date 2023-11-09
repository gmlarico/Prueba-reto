using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Aplication.Features.Movies;
using Taller.MovieCinema.Domain.Entities;
using Taller.MovieCinema.Domain.Repositories;

namespace Taller.MovieCinema.Aplication.Features_applications
{
    public class MoviesApplication : IMoviesApplication
    {

        private readonly IMoviesRepository _moviesRepository;
        public MoviesApplication(IMoviesRepository moviesRepository)
        {
            _moviesRepository = moviesRepository;
        }

        //LISTAR TODO - METODO NORMAL -- EN USO EN EL CONTROLADOR API
        public async Task<List<FindAllItemResult>> FindAll()
        {
            var result = await _moviesRepository.FindAll();

            // TODO: SE PUEDE Utiliza mapper tools library.
            return result.Select(x => new FindAllItemResult
            {
                Description = x.Description,
                Gender = x.Gender!.Name,
                Name = x.Name
            }).ToList();
        }

        public Task Add(CreateMovieInput movie)
        {
            throw new NotImplementedException();
        }

        public Task Delete(int id)
        {
            throw new NotImplementedException();
        }



        public Task<List<FindByGenderitemResult>> FindByGender(int genderId)
        {
            throw new NotImplementedException();
        }

        public Task<FindByIdResult> FindById(int id)
        {
            throw new NotImplementedException();
        }

        public Task Update(UpdateMovieInput movie)
        {
            throw new NotImplementedException();
        }
    }
}
