using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taller.MovieCinema.Aplication.Features.Movies.Queries.FindById
{
    public class FindByIdQueryResponse
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int? GenderId { get; set; }
        public int? NumTicket { get; set; }
        public string? ImageUrl { get; set; }
        public string? Gender { get; set; }
    }
}
