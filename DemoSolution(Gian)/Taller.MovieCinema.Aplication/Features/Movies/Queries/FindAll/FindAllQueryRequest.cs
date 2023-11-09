using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Infrastructure.Core.Abstractions.Queries;

namespace Taller.MovieCinema.Aplication.Features.Movies.Queries.FindAll
{
    //DEVUELVE UNA LISTA - MAS DE 1 SELECT
    public class FindAllQueryRequest: IQuery<List<FindAllQueryItemResponse>>
    {
        public string? Filter { get; set; }
    }
}
