using System;
using demo_0.Domain.Entities;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;
using demo_0.Dto;

namespace demo_0.Models
{
	public class MoviesViewModel: MoviesBaseViewModel
    {
		public UserDto? User { get; set; }
		public int? SelectedGenderId { get; set; }
		public List<Movie>? Movies { get; set; }
        public Movie? DetallePelicula { get; set; }

    }
}

