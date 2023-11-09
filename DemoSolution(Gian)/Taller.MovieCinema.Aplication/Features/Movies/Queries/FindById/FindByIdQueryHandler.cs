using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Domain.Repositories;
using Taller.MovieCinema.Infrastructure.Core.Abstractions.Queries;

namespace Taller.MovieCinema.Aplication.Features.Movies.Queries.FindById
{
    public class FindByIdQueryHandler : IQueryHandler<FindByIdQueryRequest, FindByIdQueryResponse>
    {

        private readonly IMoviesRepository _moviesRepository;
        public FindByIdQueryHandler(IMoviesRepository moviesRepository)
        {
            _moviesRepository = moviesRepository;
        }

        public async Task<FindByIdQueryResponse> HandleAsync(FindByIdQueryRequest query)
        {
            var entity = await _moviesRepository.FindById(query.Id);
            return new FindByIdQueryResponse
            {             
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                Gender = entity.Gender!.Name,
                GenderId = entity.GenderId,
                NumTicket = entity.NumTicket,
                ImageUrl = entity.ImageUrl                
            };
        }
    }
}
