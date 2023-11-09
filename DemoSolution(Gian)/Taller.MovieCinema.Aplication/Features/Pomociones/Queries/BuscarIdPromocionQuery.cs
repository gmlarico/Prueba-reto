using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Aplication.Contracts.Database;
using Taller.MovieCinema.Aplication.Features.Movies.Queries.FindAll;
using Taller.MovieCinema.Aplication.Features.Movies.Queries.FindById;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Taller.MovieCinema.Domain.Repositories;

namespace Taller.MovieCinema.Aplication.Features.Pomociones.Queries
{
    public class BuscarIdPromocionQuery : IRequest<BuscarPromocionesResponse>
    {

        public string? IdCodPromocion { get; set; }

        public class BuscarIdPromocionQueryHandler : IRequestHandler<BuscarIdPromocionQuery, BuscarPromocionesResponse>
        {
            private readonly IPromocionesRepository _promocionesRepository;
            private readonly IMapper _mapper;
            private readonly ILogger _logger;
            public BuscarIdPromocionQueryHandler(IPromocionesRepository promocionesRepository, IMapper mapper, ILogger<BuscarIdPromocionQueryHandler> logger)
            {
                _promocionesRepository = promocionesRepository;
                _mapper = mapper;
                _logger = logger;
            }
            public async Task<BuscarPromocionesResponse> Handle(BuscarIdPromocionQuery request, CancellationToken cancellationToken)
            {

                var result = await _promocionesRepository.BuscarPromocion(request.IdCodPromocion);

                return _mapper.Map<BuscarPromocionesResponse>(result);
            }
        }

    }
}
