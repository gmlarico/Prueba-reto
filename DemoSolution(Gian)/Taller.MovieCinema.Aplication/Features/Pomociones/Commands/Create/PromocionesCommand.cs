using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Aplication.Contracts.Services;
using Taller.MovieCinema.Aplication.Features.Entrada.Commands.Create;
using Taller.MovieCinema.Domain.Entities;
using Taller.MovieCinema.Domain.Repositories;

namespace Taller.MovieCinema.Aplication.Features.Pomociones.Commands.Create
{
    public class PromocionesCommand : IRequest
    {
        [Key]
        public string? IdCodPromocion { get; set; }
        public int? IdGender { get; set; }
        public string? Descripcion { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public int? FlagEstado { get; set; }

        public class PromocionesCommandHandler : IRequestHandler<PromocionesCommand>
        {
            private readonly IPromocionesRepository _promocionesRepository;
            private readonly IMapper _mapper;
            private readonly IStorageService _storageService;

            public PromocionesCommandHandler(IPromocionesRepository promocionesRepository, IMapper mapper,
                IStorageService storageService)
            {
                _promocionesRepository = promocionesRepository;
                _mapper = mapper;
                _storageService = storageService;
            }

            public async Task Handle(PromocionesCommand request, CancellationToken cancellationToken)
            {
                var entity = _mapper.Map<CodigosPromocion>(request);

                await _promocionesRepository.AddCodPromociones(entity);

                _storageService.Save(new MemoryStream());

            }

        }
    }
}
