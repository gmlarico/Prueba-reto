using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taller.MovieCinema.Aplication.Features.Pomociones.Queries
{
    public class BuscarPromocionesResponse
    {
        [Key]
        public string? IdCodPromocion { get; set; }
        public int? IdGender { get; set; }
        public string? Descripcion { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public int? FlagEstado { get; set; }
    }
}
