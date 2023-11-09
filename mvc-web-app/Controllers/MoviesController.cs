using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using demo_0.Application;
using demo_0.Domain.Entities;
using demo_0.Dto;
using demo_0.Models;
using demo_0.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace demo_0.Controllers
{
    public class MoviesController : Controller
    {
        private readonly MoviesDbContext _context;
        private readonly IUserApplication _userApplication;
        private IWebHostEnvironment Environment;
        private string baseUploadUrl = "uploads";
        private readonly IMovieApplication _movieApplication;


        public MoviesController(MoviesDbContext context, IUserApplication userApplication, IWebHostEnvironment _environment, IMovieApplication movieApplication)
        {
            _context = context;
            _userApplication = userApplication;
            Environment = _environment;
            _movieApplication = movieApplication;
        }

        // GET: /<controller>/
        //public async Task<IActionResult> Index()
        //{
        //    MoviesViewModel model = new();
        //    this.InitializeFilters(model);

        //    model.User = await _userApplication.GetById(1);

        //    model.Movies = this.FindMovies(null);

        //    return View(model);
        //}

        public async Task<IActionResult> Index()
        {
            MoviesViewModel model = new();
            this.InitializeFilters(model);

            model.User = await _userApplication.GetById(1);

            var movieResult = await _movieApplication.FindAll();

            model.Movies = movieResult.Select(x => new Movie
            {
                Id = x.Id,
                Name = x.Name,
                ImageUrl = x.ImageUrl,
                Description = x.Description,
                Gender = new Gender { Name = x.Gender }
            }).ToList();

            //model.User = await _userApplication.GetById(1);

            //model.Movies = this.FindMovies(null);

            return View(model);
        }

        public async Task<IActionResult> AdminCenter()
        {
            MoviesViewModel model = new();
            this.InitializeFilters(model);

            model.User = await _userApplication.GetById(1);

            var movieResult = await _movieApplication.FindAll();

            model.Movies = movieResult.Select(x => new Movie
            {
                Id = x.Id,
                Name = x.Name,
                ImageUrl = x.ImageUrl,
                Description = x.Description,
                Gender = new Gender { Name = x.Gender }
            }).ToList();


            return View(model);
        }

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public IActionResult Index(MoviesViewModel model)
        //{


        //    if (!ModelState.IsValid)
        //    {
        //        return Problem("Formato de datos no válido");
        //    }

        //    this.InitializeFilters(model);

        //    model.Movies = this.FindMovies(model.SelectedGenderId);


        //    return View("Index", model);

        //}

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Index(MoviesViewModel model)
        {


            if (!ModelState.IsValid)
            {
                return Problem("Formato de datos no válido");
            }

            this.InitializeFilters(model);

            var movieResult = await _movieApplication.FindAll();

            model.Movies = movieResult.Select(x => new Movie
            {
                Id = x.Id,
                Name = x.Name,
                ImageUrl = x.ImageUrl,
                Description = x.Description,
                Gender = new Gender { Name = x.Gender }
            }).ToList();


            return View("Index", model);

        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var MovieIdRequest = new Dto.MovieIdDto { Id = id };
            var movie = await _movieApplication.FindById(MovieIdRequest);
            var generos = (await _movieApplication.ListarGenero()).ToList();

            MoviesEditViewModel model = new()
            {
                Id = movie.Id,
                Name = movie.Name,
                Description = movie.Description,
                GenderId = movie.GenderId
            };

            model.GenderList = new SelectList(generos, "Id", "Name");
            return View(model);
        }

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Edit(MoviesEditViewModel model)
        //{
        //    if (model != null && ModelState.IsValid)
        //    {
        //        var movie = _context.Movies.FirstOrDefault(x => x.Id == model.Id);

        //        if (movie == null)
        //        {
        //            return NotFound();
        //        }
        //        movie.Name = model.Name;
        //        movie.Description = model.Description;
        //        movie.GenderId = model.GenderId;

        //        if (model.ImageFile != null && model.ImageFile.Length > 0)
        //        {
        //            string fileName = $"{DateTime.Now.ToString("yyyyMMddhhmmssfff")}-{model.ImageFile.FileName}";
        //            movie.ImageUrl = $"{this.baseUploadUrl}/{fileName}";
        //            await this.UploadFile(model.ImageFile, fileName);
        //        }

        //        _context.Movies.Update(movie);
        //        await _context.SaveChangesAsync();

        //        return RedirectToAction(nameof(Index));

        //    }

        //    return View(model);
        //}

        [HttpPost]
        public async Task<IActionResult> Edit(MoviesEditViewModel model)
        {         
            if (model != null && ModelState.IsValid)
            {

                await _movieApplication.Update(new Dto.MovieDto
                {
                    Id = model.Id,
                    Description = model.Description,
                    GenderId = model.GenderId,
                    Name = model.Name,
                    ImageUrl = model.ImageUrl
                });

                //await _context.SaveChangesAsync();

                return RedirectToAction(nameof(Index));

            }

            return View(model);
        }

        [HttpGet]
        public IActionResult Delete(int id)
        {
            var movie = _context.Movies.First(x => x.Id == id);

            MoviesEditViewModel model = new()
            {
                Id = movie.Id,
                Name = movie.Name,
                Description = movie.Description,
                GenderId = movie.GenderId
            };

            this.InitializeFilters(model);
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(MoviesEditViewModel model)
        {
            var movie = await _context.Movies.FirstAsync(x => x.Id == model.Id);
            if (movie == null)
            {
                return NotFound();
            }

            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();

            TempData["Alerta"] = "Se eliminó la película " + movie.Name;

            return RedirectToAction(nameof(Index));

        }

        [HttpGet]
        public IActionResult ImageViewerPartial(ImageViewModel model)
        {
            return PartialView("_ImageViewerPartial", model);
        }

        private async void InitializeFilters(MoviesBaseViewModel model)
        {
       
            var generos = await _movieApplication.ListarGenero();

            var genders = generos.ToList();
            
            model.GenderList = new SelectList(genders, "Id", "Name");

        }

        private List<Movie> FindMovies(int? genderId)
        {

            var movies = _context.Movies
                .Where(x => (!genderId.HasValue || x.GenderId == genderId)).ToList();

            return movies;
        }

        private async Task UploadFile(IFormFile file, string fileName)
        {

            string path = Path.Combine(this.Environment.WebRootPath, this.baseUploadUrl);
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            string newfileName = Path.GetFileName(fileName);
            using FileStream stream = new(Path.Combine(path, newfileName), FileMode.Create);
            await file.CopyToAsync(stream);

        }

        [HttpGet]
        public async Task<IActionResult> DetallePelicula(int Id)
        {
            var MovieIdRequest = new Dto.MovieIdDto { Id = Id };

            MoviesViewModel model = new();
            var movieResult = await _movieApplication.FindById(MovieIdRequest);

            model.DetallePelicula = new()
            {
                Id = movieResult.Id,
                Name = movieResult.Name,
                Description = movieResult.Description,
                Gender = new Gender { Name = movieResult.Gender },
                GenderId = movieResult.GenderId,
                ImageUrl = movieResult.ImageUrl,
                NumTicket = movieResult.NumTicket
            };

            return View(model);
        }

        [HttpGet]
        public async Task<IActionResult> ComprarEntrada(int Id)
        {
            var MovieIdRequest = new Dto.MovieIdDto { Id = Id };

            MoviesViewModel model = new();
            var movieResult = await _movieApplication.FindById(MovieIdRequest);
            var generos = (await _movieApplication.ListarGenero()).ToList();

            model.DetallePelicula = new()
            {
                Id = movieResult.Id,
                Name = movieResult.Name,
                Description = movieResult.Description,
                Gender = new Gender { Name = movieResult.Gender },
                GenderId = movieResult.GenderId,
                ImageUrl = movieResult.ImageUrl,
                NumTicket = movieResult.NumTicket
            };
            model.GenderList = new SelectList(generos, "Id", "Name");
            return View(model);
        }

        [HttpPost]
        public async Task<ControlDto> GuardarEntrada([FromBody]EntradasViewModel Entradas)
        {
            var EntradaRequest = new Dto.EntradaDto { 
                IdPelicula = Entradas.IdPelicula,
                NomCliente =Entradas.NomCliente,
                Email = Entradas.Email,
                FlagEstado = 1,
                IdCodPromocion = Entradas.IdCodPromocion            
            };

            var Result = await _movieApplication.ComprarEntrada(EntradaRequest);

            if (Result.Codigo.Contains("200") && Result.Codigo.Contains("OK") )
            {

                Result.Descripcion = "OK";

            }
            else
            {
                Result.Descripcion = "Eror";
            }

            return Result;
        }


        [HttpPost]
        public async Task<CuponesViewModel> BuscarPromocion([FromBody] CuponesDto Request)
        {
            //var MovieIdRequest = new Dto.CuponesDto { IdCodPromocion = Id };

            CuponesViewModel model = new();
            var movieResult = await _movieApplication.BuscarCuponId(Request.IdCodPromocion);
            //var generos = (await _movieApplication.ListarGenero()).ToList();

            model.DetalleCupones = new()
            {
                IdCodPromocion = movieResult.IdCodPromocion,
                Descripcion = movieResult.Descripcion,
                IdGender = movieResult.IdGender
            };          
            return model;
        }

        public IActionResult Promociones()
        {
           return View();
        }


        [HttpGet]
        public async Task<List<CuponesDto>> ListarCupones()
        {
            MoviesViewModel model = new();
            var movieResult = await _movieApplication.ListaCupones();
            return movieResult;
        }

        public async Task<IActionResult> CrearPromocion()
        {
            MoviesViewModel model = new();
            this.InitializeFilters(model);

            var generos = (await _movieApplication.ListarGenero()).ToList();
            model.GenderList = new SelectList(generos, "Id", "Name");

            return View(model);
        }

        [HttpPost]
        public async Task<ControlDto> GenerarPromocion([FromBody] CuponesCreateModel cupones)
        {
            var CuponesRequest = new Dto.CuponesDto
            {
                IdCodPromocion = cupones.IdCodPromocion,
                Descripcion = cupones.Descripcion,
                IdGender = cupones.IdGender,
                FechaInicio = cupones.FechaInicio,
                FechaFin = cupones.FechaFin,
                FlagEstado = 1
            };


            var Result = await _movieApplication.CrearCupones(CuponesRequest);

            if (Result.Codigo.Contains("200") && Result.Codigo.Contains("OK"))
            {

                Result.Descripcion = "OK";

            }
            else
            {
                Result.Descripcion = "Eror";
            }

            return Result;
        }

    }
}

