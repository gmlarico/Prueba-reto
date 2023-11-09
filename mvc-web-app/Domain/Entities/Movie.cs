using System;
using System.ComponentModel.DataAnnotations;

namespace demo_0.Domain.Entities
{
	public class Movie: BaseEntity
    {
       
        public string? Name { get; set; }
        public string? ImageUrl { get; set; }
        public string? Description { get; set; }
        public int? GenderId { get; set; }

        public int? NumTicket { get; set; }

        public Gender? Gender { get; set; }

        public List<MovieSchedule>? MovieSchedules { get; set; }
    }
}

