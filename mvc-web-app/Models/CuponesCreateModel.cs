using System.ComponentModel.DataAnnotations;

namespace demo_0.Models
{
    public class CuponesCreateModel
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
