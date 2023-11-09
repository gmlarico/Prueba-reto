using demo_0.Domain.Entities;
using demo_0.Models;
using demo_0.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Server.IIS.Core;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace demo_0.Controllers
{
    public class MoviesScheduleController : Controller
    {
        private readonly MoviesDbContext _context;
        public MoviesScheduleController(MoviesDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            MovieScheduleViewModel model = new();
            this.Initialize(model);

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Index(MovieScheduleViewModel model)
        {
            MovieSchedule entity = new ();
            entity.MovieId=model.MovieId;
            entity.CinemaId = model.CinemaId;
            entity.StartDate = model.StartDate;
            entity.EndDate = model.EndDate;

            entity.ScheduleTimes = new List<MovieScheduleTime>();
            entity.ScheduleTimes = model.ScheduleTimes!.Where(x => x.Selected).ToList();

            _context.MovieSchedules.Add(entity);

            await _context.SaveChangesAsync();

            this.Initialize(model);

            TempData["Alerta"] = "Película programada correctamente";

            return View(model);
        }

        private void Initialize(MovieScheduleViewModel model) {
            var movies = _context.Movies.ToList();
            model.Movies = new SelectList(movies, "Id", "Name");
            var cinemas = _context.Cinemas.ToList();
            model.Cinemas = new SelectList(cinemas, "Id", "Name");

            model.Times = new List<MovieScheduleTime>();
            for (int i = 13; i <= 23; i++)
            {
                model.Times.Add(new MovieScheduleTime { Hour = $"{i.ToString().PadLeft(2, '0')}:00", Selected=false });
                model.Times.Add(new MovieScheduleTime { Hour = $"{i.ToString().PadLeft(2, '0')}:30", Selected = false });
            }
            
        }
    }
}
