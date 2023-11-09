using demo_0.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace demo_0.Models
{
    public class CuponesViewModel : MoviesBaseViewModel
    {
        public List<Cupones>? Cupones { get; set; }
        public Cupones? DetalleCupones { get; set; }
    }
}
