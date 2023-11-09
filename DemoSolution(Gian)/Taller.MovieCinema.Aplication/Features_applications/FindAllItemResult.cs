using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Domain.Entities;

namespace Taller.MovieCinema.Aplication.Features_applications
{
    public class FindAllItemResult
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Gender { get; set; }
    }
}
