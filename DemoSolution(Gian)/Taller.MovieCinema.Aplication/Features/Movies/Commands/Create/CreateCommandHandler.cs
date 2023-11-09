using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Domain.Repositories;
using Taller.MovieCinema.Infrastructure.Core.Abstractions.Commands;
using Taller.MovieCinema.Domain.Entities;
using AutoMapper;
using Taller.MovieCinema.Aplication.Contracts.Services;

namespace Taller.MovieCinema.Aplication.Features.Movies.Commands.Create
{
    public class CreateCommandHandler: ICommandHandler<CreateCommandRequest>
    {
        private readonly IMoviesRepository _moviesRepository;
        private readonly IMapper _mapper;

        private readonly IStorageService _storageService;
        public CreateCommandHandler(IMoviesRepository moviesRepository,IMapper mapper,IStorageService storageService)
        {
            _moviesRepository = moviesRepository;
            _mapper = mapper;
            _storageService = storageService;
        }

        //SIN MAPPER
        public async Task HandleAsync(CreateCommandRequest command)
        {
            var entity = new Movie
            {
                Description = command.Description,
                GenderId = command.GenderId,
                Name = command.Name,
                ImageUrl = command.ImageUrl
            };
            await _moviesRepository.Add(entity);

            _storageService.Save(new MemoryStream());
        }

        //CON MAPPER
        //public async Task HandleAsync(CreateCommandRequest command)
        //{
        //    var entity = _mapper.Map<Movie>(command);

        //    await _moviesRepository.Add(entity);
        //    _storageService.Save(new MemoryStream());
        //}
    }
}
