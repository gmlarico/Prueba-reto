using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Taller.MovieCinema.Aplication.Features.Entrada.Commands.Create;
using Taller.MovieCinema.Aplication.Features.Genders.Queries;
using Taller.MovieCinema.Aplication.Features.Movies.Commands.Create;
using Taller.MovieCinema.Aplication.Features.Movies.Commands.Update;
using Taller.MovieCinema.Aplication.Features.Movies.Queries.FindAll;
using Taller.MovieCinema.Aplication.Features.Pomociones.Commands.Create;
using Taller.MovieCinema.Aplication.Features.Pomociones.Queries;
using Taller.MovieCinema.Domain.Entities;

namespace Taller.MovieCinema.Aplication.Features.Movies.Mappings
{
    public class MoviesProfile : Profile
    {
        public MoviesProfile()
        {
            CreateMap<CreateCommandRequest, Movie>();
            CreateMap<CreateCommand, Movie>();
            CreateMap<EntradasCommand, Entradas>();
            CreateMap<PromocionesCommand, CodigosPromocion>();
            CreateMap<UpdateCommand, Movie>();

            CreateMap<Movie, FindAllQueryItemResponse>()
                .ForMember(d => d.Gender, s => s.MapFrom(x => x.Gender!.Name));

            CreateMap<CodigosPromocion, BuscarPromocionesResponse>();

            CreateMap<Gender, ListarGenerosQueryResponse>();
        }
    }
}
