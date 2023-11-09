using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Aplication.Features.Movies;
using Taller.MovieCinema.Domain.Entities;

namespace Taller.MovieCinema.Aplication.Features_applications
{
    public interface IMoviesApplication
    {

        Task<List<FindAllItemResult>> FindAll();
        Task<FindByIdResult> FindById(int id);
        Task<List<FindByGenderitemResult>> FindByGender(int genderId);
        Task Update(UpdateMovieInput movie);
        Task Add(CreateMovieInput movie);
        Task Delete(int id);


    }
}
