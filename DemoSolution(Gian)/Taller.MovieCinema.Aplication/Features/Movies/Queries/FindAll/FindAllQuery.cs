using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Aplication.Contracts.Database;
using Microsoft.EntityFrameworkCore;
using Taller.MovieCinema.Domain.Entities;

namespace Taller.MovieCinema.Aplication.Features.Movies.Queries.FindAll
{
    //USO DE MINIMAL APPIS Y MEDIATER
    public class FindAllQuery : IRequest<List<FindAllQueryItemResponse>>
    {
        public string? Filter { get; set; }


        public class FindAllQueryHandler : IRequestHandler<FindAllQuery, List<FindAllQueryItemResponse>>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            private readonly ILogger _logger;
            public FindAllQueryHandler(IApplicationDbContext context, IMapper mapper, ILogger<FindAllQueryHandler> logger)
            {
                _context = context;
                _mapper = mapper;
                _logger = logger;
            }
            public async Task<List<FindAllQueryItemResponse>> Handle(FindAllQuery request, CancellationToken cancellationToken)
            {
                _logger.LogInformation("Ejecutando FindAllQueryHandler");
                var result = await _context.Movies.Include(x => x.Gender).ToListAsync();

                return _mapper.Map<List<FindAllQueryItemResponse>>(result);
            }
        }

    }
}
