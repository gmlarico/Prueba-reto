using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Domain.Entities;

namespace Taller.MovieCinema.Domain.Repositories
{
    public interface IPromocionesRepository
    {
        Task<List<CodigosPromocion>> ListarPromocion();
        Task<CodigosPromocion> BuscarPromocion(string? IdCodPromocion);
        Task AddCodPromociones(CodigosPromocion codigosPromocion);
    }
}
