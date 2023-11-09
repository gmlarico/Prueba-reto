using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Domain.Entities;

namespace Taller.MovieCinema.Aplication.Features.Movies.Queries.FindAll
{
    public class FindAllQueryProfile//: Profile
    {
        public FindAllQueryProfile() 
        {
            //CreateMap<Movie, FindAllQueryItemResponse>()
            //.ForMember(d => d.Gender, s => s.MapFrom(x => x.Gender!.Name));
        }

    }
}
