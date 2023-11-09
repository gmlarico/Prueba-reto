using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Aplication.Features.Pomociones.Queries;
using static Taller.MovieCinema.Aplication.Features.Pomociones.Queries.BuscarIdPromocionQuery;
using Taller.MovieCinema.Domain.Repositories;

namespace Taller.MovieCinema.Aplication.Features.Genders.Queries
{
    public class ListarGenerosQuery : IRequest<List<ListarGenerosQueryResponse>>
    {
        public class ListarGenerosQueryHandler : IRequestHandler<ListarGenerosQuery, List<ListarGenerosQueryResponse>>
        {
            private readonly IGenerosRepository _generosRepository;
            private readonly IMapper _mapper;
            private readonly ILogger _logger;
            public ListarGenerosQueryHandler(IGenerosRepository generosRepository, IMapper mapper, ILogger<BuscarIdPromocionQueryHandler> logger)
            {
                _generosRepository = generosRepository;
                _mapper = mapper;
                _logger = logger;
            }

            public async Task<List<ListarGenerosQueryResponse>> Handle(ListarGenerosQuery request, CancellationToken cancellationToken)
            {
                var result = await _generosRepository.ListarGeneros();

                return _mapper.Map<List<ListarGenerosQueryResponse>>(result);
            }

        }
    }
}
