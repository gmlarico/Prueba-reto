using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taller.MovieCinema.Aplication.Contracts.Services
{
    public interface IStorageService
    {
        void Save(MemoryStream stream);
    }
}
