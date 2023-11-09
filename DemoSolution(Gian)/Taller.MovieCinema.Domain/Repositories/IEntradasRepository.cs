using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Domain.Entities;

namespace Taller.MovieCinema.Domain.Repositories
{
    public interface IEntradasRepository
    {
        Task AddEntradas(Entradas entradas);
        Task UpdateNumTicket(Movie movie);
    }
}
