using demo_0.Domain.Entities;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;

namespace demo_0.Models
{
    public class MovieScheduleViewModel
    {
        public int Id { get; set; }
        [Required]
        public int MovieId { get; set; }
        [Required]
        public int CinemaId { get; set; }
        [Required]
        public DateTime StartDate { get; set; } = DateTime.Now;
        [Required]
        public DateTime EndDate { get; set; } = DateTime.Now.AddDays(7);

        public SelectList? Movies { get; set; }
        public SelectList? Cinemas { get; set; }

        public List<MovieScheduleTime>? ScheduleTimes { get; set; }

        public List<MovieScheduleTime>? Times { get; set; }
    }
}
