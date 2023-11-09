using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Infrastructure.Core.Abstractions.Queries;

namespace Taller.MovieCinema.Aplication.Features.Movies.Queries.FindById
{
    //DEVUELDE UN SOLO RESULTADO - SELECT
    public class FindByIdQueryRequest: IQuery<FindByIdQueryResponse>
    {
        public int Id { get; set; }
    }
}
