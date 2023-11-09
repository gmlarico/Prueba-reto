using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Aplication.Contracts.Database;
using Taller.MovieCinema.Aplication.Features.Movies.Queries.FindAll;
using static Taller.MovieCinema.Aplication.Features.Pomociones.Queries.BuscarIdPromocionQuery;
using Taller.MovieCinema.Domain.Repositories;

namespace Taller.MovieCinema.Aplication.Features.Pomociones.Queries
{
    public class ListarPromocionQuery : IRequest<List<BuscarPromocionesResponse>>
    {

        public class ListarPromocionQueryHandler : IRequestHandler<ListarPromocionQuery, List<BuscarPromocionesResponse>>
        {
            private readonly IPromocionesRepository _promocionesRepository;
            private readonly IMapper _mapper;
            private readonly ILogger _logger;
            public ListarPromocionQueryHandler(IPromocionesRepository promocionesRepository, IMapper mapper, ILogger<ListarPromocionQueryHandler> logger)
            {
                _promocionesRepository = promocionesRepository;
                _mapper = mapper;
                _logger = logger;
            }

            public async Task<List<BuscarPromocionesResponse>> Handle(ListarPromocionQuery request, CancellationToken cancellationToken)
            {
                var result = await _promocionesRepository.ListarPromocion();

                return _mapper.Map<List<BuscarPromocionesResponse>>(result);
            }

        }
    }
}
