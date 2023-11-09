using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Aplication.Features_applications;

namespace Taller.MovieCinema.Aplication.Features.Movies
{
    public interface IFindMovieByGenderUseCase
    {
        Task<List<FindMovieByGenderItemResult>> Handle(int genderId);
    }
}
