using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taller.MovieCinema.Domain.Entities
{
    public class Movie: BaseEntity
    {

        public string? Name { get; set; }
        public string? ImageUrl { get; set; }
        public string? Description { get; set; }
        public int? GenderId { get; set; }
        public int? NumTicket { get; set; }
        public Gender? Gender { get; set; }
    }
}
