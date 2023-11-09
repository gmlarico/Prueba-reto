using System.ComponentModel.DataAnnotations;

namespace demo_0.Domain.Entities
{
    public class Cupones
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
