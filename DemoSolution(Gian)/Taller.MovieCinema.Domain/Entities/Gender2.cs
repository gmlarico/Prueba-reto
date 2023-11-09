using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taller.MovieCinema.Domain.Entities
{
    public class Gender2 : BaseEntity
    {
        public String? Name { get; set; }

        public int NumTickets { get; set; }
    }
}
