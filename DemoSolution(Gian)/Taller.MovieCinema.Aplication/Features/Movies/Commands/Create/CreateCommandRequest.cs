using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Infrastructure.Core.Abstractions.Commands;

namespace Taller.MovieCinema.Aplication.Features.Movies.Commands.Create
{
    public class CreateCommandRequest : ICommand
    {
        public string? Name { get; set; }
        public string? ImageUrl { get; set; }
        public string? Description { get; set; }
        public int? GenderId { get; set; }
    }
}
