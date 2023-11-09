using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace demo_0.Models
{
	public class MoviesEditViewModel: MoviesBaseViewModel
	{
        [Required]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        public string? ImageUrl { get; set; }
        public IFormFile? ImageFile { get; set; }
        [Required]
        public string? Description { get; set; }
        [Required]
        public int? GenderId { get; set; }
    }
}

