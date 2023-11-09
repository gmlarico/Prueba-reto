using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taller.MovieCinema.Aplication.Features.Movies.Queries.FindAll
{
    public class FindAllQueryItemResponse
    {

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Gender { get; set; }

    }
}
