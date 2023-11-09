using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Aplication.Features_applications;
using Taller.MovieCinema.Domain.Repositories;

namespace Taller.MovieCinema.Aplication.Features.Movies
{
    public class FindMovieByGenderUseCase : IFindMovieByGenderUseCase
    {
        private readonly IMoviesRepository _moviesRepository;

        public FindMovieByGenderUseCase(IMoviesRepository moviesRepository)
        {
            _moviesRepository = moviesRepository;
        }
        public async Task<List<FindMovieByGenderItemResult>> Handle(int genderId)
        {
            var result = await _moviesRepository.Find(x => x.GenderId == genderId);

            return result.Select(x => new FindMovieByGenderItemResult
            {
                Description = x.Description,
                Gender = x.Gender!.Name,
                Name = x.Name
            }).ToList();
        }
    }
}
