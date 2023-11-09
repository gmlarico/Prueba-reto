using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taller.MovieCinema.Domain.Entities
{
    public class Entradas : BaseEntity
    {
        public int? IdPelicula { get; set; }
        public string? NomCliente { get; set; }
        public string? Email { get; set; }
        public int? FlagEstado { get; set; }
        public string? IdCodPromocion { get; set; }
    }
}
