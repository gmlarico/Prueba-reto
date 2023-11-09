using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Domain.Entities;
using Taller.MovieCinema.Domain.Repositories;

namespace Taller.MovieCinema.Aplication.Features.Movies.Commands.Update
{
    public class UpdateCommand : IRequest
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? ImageUrl { get; set; }
        public string? Description { get; set; }
        public int? GenderId { get; set; }

        public class UpdateCommandHandler : IRequestHandler<UpdateCommand>
        {
            private readonly IMoviesRepository _moviesRepository;
            private readonly IMapper _mapper;

            public UpdateCommandHandler(IMoviesRepository moviesRepository, IMapper mapper)
            {
                _moviesRepository = moviesRepository;
                _mapper = mapper;
            }
            public async Task Handle(UpdateCommand request, CancellationToken cancellationToken)
            {
                //var entity = await _moviesRepository.FindById(request.Id) ?? throw new NotFoundException("No se encontró la película con Id=" + request.Id);

                ////entity.Description = request.Description;
                //entity.Name = request.Name;
      

                var entity = _mapper.Map<Movie>(request);

                await _moviesRepository.Update(entity);
            }
        }


    }
}
