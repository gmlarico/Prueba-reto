using System;
using demo_0.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace demo_0.Persistence
{
	public class MoviesDbContext: DbContext
	{

        public DbSet<MovieScheduleTime> MovieScheduleTimes { get; set; }
        public DbSet<MovieSchedule> MovieSchedules { get; set; }
        public DbSet<Cinema> Cinemas { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<User> Users { get; set; }

        public MoviesDbContext(DbContextOptions<MoviesDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


        }

    }
}

