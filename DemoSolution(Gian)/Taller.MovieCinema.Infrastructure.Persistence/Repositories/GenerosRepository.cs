using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Domain.Entities;
using Taller.MovieCinema.Domain.Repositories;
using Taller.MovieCinema.Infrastructure.Persistence.DataBase;

namespace Taller.MovieCinema.Infrastructure.Persistence.Repositories
{
    public class GenerosRepository : IGenerosRepository
    {
        private readonly MovieDbContext _context;

        public GenerosRepository(MovieDbContext context)
        {
            _context = context;
        }
        public async Task<List<Gender>> ListarGeneros()
        {
            return await _context.Genders.ToListAsync();
        }
    }
}
