using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Aplication.Contracts.Database;
using Taller.MovieCinema.Aplication.Features_applications;
using Taller.MovieCinema.Domain.Repositories;
using Taller.MovieCinema.Infrastructure.Core.Abstractions.Queries;

namespace Taller.MovieCinema.Aplication.Features.Movies.Queries.FindAll
{
    public class FindAllQueryHandler : IQueryHandler<FindAllQueryRequest, List<FindAllQueryItemResponse>>
    {
        //USO DE ABSTRACCIONES

        private readonly IMoviesRepository _moviesRepository;
        private readonly IMapper _mapper;
        //LLAMADO A LA BASE DE DATOS DE FORMA INDEPENDIENTE CON CONTRATOS
        private readonly IApplicationDbContext _context;
        public FindAllQueryHandler(IMoviesRepository moviesRepository,IMapper mapper, IApplicationDbContext context)
        {
            _moviesRepository = moviesRepository;
            _mapper = mapper;
            _context = context;
        }

        //SIN MAPPERS
        //public async Task<List<FindAllQueryItemResponse>> HandleAsync(FindAllQueryRequest query)
        //{
        //    var result = await _moviesRepository.FindAll();
        //    return result.Select(x => new FindAllQueryItemResponse
        //    {
        //        Description = x.Description,
        //        Gender = x.Gender!.Name,
        //        Name = x.Name,
        //        Id = x.Id
        //    }).ToList();
                
        //}

        //CON MAPPERS
        public async Task<List<FindAllQueryItemResponse>> HandleAsync(FindAllQueryRequest query)
        {
            //llamado a movies repository
            //var result = await _moviesRepository.FindAll();

            //llamado a movies con context 
            var result = await _context.Movies.Include(x => x.Gender).ToListAsync();

            return _mapper.Map<List<FindAllQueryItemResponse>>(result);

        }
    }
}
