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
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Taller.MovieCinema.Aplication.Features.Entrada.Commands.Create
{
    public class EntradasCommand : IRequest
    {
        public int IdPelicula { get; set; }
        public string? NomCliente { get; set; }
        public string? Email { get; set; }
        public int? FlagEstado { get; set; }
        public string? IdCodPromocion { get; set; }

        public class EntradasCommandHandler : IRequestHandler<EntradasCommand>
        {

            private readonly IEntradasRepository _EntradasRepository;
            private readonly IMoviesRepository _moviesRepository;
            private readonly IMapper _mapper;
            private readonly IStorageService _storageService;

            public EntradasCommandHandler(IEntradasRepository EntradasRepository, IMoviesRepository moviesRepository, IMapper mapper,
                IStorageService storageService)
            {
                _EntradasRepository = EntradasRepository;
                _moviesRepository = moviesRepository;
                _mapper = mapper;
                _storageService = storageService;
            }

            public async Task Handle(EntradasCommand request, CancellationToken cancellationToken)
            {
                var movie = new Movie();
                int cantidadTicket;

                var PeliculaEncontrada = await _moviesRepository.FindById(request.IdPelicula);

                cantidadTicket = Convert.ToInt32(PeliculaEncontrada.NumTicket);

                if (cantidadTicket > 0)
                {
                    var entity = _mapper.Map<Entradas>(request);
                    await _EntradasRepository.AddEntradas(entity);

                    movie.Id = request.IdPelicula;
                    movie.NumTicket = cantidadTicket - 1;

                    await _EntradasRepository.UpdateNumTicket(movie);

                    _storageService.Save(new MemoryStream());

                }

            }

        }
    }
}
