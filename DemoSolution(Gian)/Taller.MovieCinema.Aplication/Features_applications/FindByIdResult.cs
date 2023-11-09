using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Domain.Entities;

namespace Taller.MovieCinema.Aplication.Features_applications
{
    public class FindByIdResult
    {

        public string? Name { get; set; }
        public string? ImageUrl { get; set; }
        public string? Description { get; set; }
        public int? GenderId { get; set; }

        public Gender? Gender { get; set; }
    }
}
