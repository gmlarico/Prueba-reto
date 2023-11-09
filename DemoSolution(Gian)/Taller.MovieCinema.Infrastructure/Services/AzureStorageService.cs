using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Aplication.Contracts.Services;

namespace Taller.MovieCinema.Infrastructure.Services
{
    public class AzureStorageService : IStorageService
    {
        public void Save(MemoryStream stream)
        {
            System.Console.WriteLine("Archivo guardado en Azure Storage");
        }
    }
}
