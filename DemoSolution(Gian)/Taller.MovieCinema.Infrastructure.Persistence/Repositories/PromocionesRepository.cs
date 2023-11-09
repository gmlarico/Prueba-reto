using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Domain.Entities;
using Taller.MovieCinema.Domain.Repositories;
using Taller.MovieCinema.Infrastructure.Core.Exceptions;
using Taller.MovieCinema.Infrastructure.Persistence.DataBase;

namespace Taller.MovieCinema.Infrastructure.Persistence.Repositories
{
    public class PromocionesRepository : IPromocionesRepository
    {
        private readonly MovieDbContext _context;

        public PromocionesRepository(MovieDbContext context)
        {
            _context = context;
        }

        public async Task AddCodPromociones(CodigosPromocion codigosPromocion)
        {
            _context.CodigosPromocion.Add(codigosPromocion);
            await _context.SaveChangesAsync();
        }

        public async Task<List<CodigosPromocion>> ListarPromocion()
        {
            return await _context.CodigosPromocion.ToListAsync();
        }

        public async Task<CodigosPromocion> BuscarPromocion(string? IdCodPromocion)
        {
            var promocion = await _context.CodigosPromocion.FirstOrDefaultAsync(x => x.IdCodPromocion == IdCodPromocion);

            if (promocion == null)
            {
                throw new NotFoundException($"No se encontró la Promocion con ID= {IdCodPromocion}");
            }

            return promocion;
        }

        
       
    }
}
