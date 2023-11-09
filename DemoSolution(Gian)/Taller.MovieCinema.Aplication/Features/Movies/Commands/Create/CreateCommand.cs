using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Aplication.Contracts.Services;
using Taller.MovieCinema.Domain.Entities;
using Taller.MovieCinema.Domain.Repositories;

namespace Taller.MovieCinema.Aplication.Features.Movies.Commands.Create
{
    //CREAR PELKCULA CON MEDIATR Y MAPPER
    public class CreateCommand : IRequest
    {
        public string? Name { get; set; }
        public string? ImageUrl { get; set; }
        public string? Description { get; set; }
        public int? GenderId { get; set; }
        public int? NumTicket{ get; set; }

        public class CreateCommandHandler : IRequestHandler<CreateCommand>
        {
            private readonly IMoviesRepository _moviesRepository;
            private readonly IMapper _mapper;
            private readonly IStorageService _storageService;

            public CreateCommandHandler(IMoviesRepository moviesRepository, IMapper mapper,
                IStorageService storageService)
            {
                _moviesRepository = moviesRepository;
                _mapper = mapper;
                _storageService = storageService;
            }


            public async Task Handle(CreateCommand request, CancellationToken cancellationToken)
            {
                var entity = _mapper.Map<Movie>(request);

                await _moviesRepository.Add(entity);

                _storageService.Save(new MemoryStream());

            }
        }

    }
}
