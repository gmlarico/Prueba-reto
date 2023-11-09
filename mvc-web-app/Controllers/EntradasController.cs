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

namespace demo_0.Controllers
{
    public class EntradasController : Controller
    {
        private readonly MoviesDbContext _context;
        private readonly IUserApplication _userApplication;
        private IWebHostEnvironment Environment;
        private string baseUploadUrl = "uploads";
        private readonly IMovieApplication _movieApplication;

        public EntradasController(MoviesDbContext context, IUserApplication userApplication, IWebHostEnvironment _environment, IMovieApplication movieApplication)
        {
            _context = context;
            _userApplication = userApplication;
            Environment = _environment;
            _movieApplication = movieApplication;

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

        public async Task<ControlDto> GuardarEntrada([FromBody] EntradasViewModel Entradas)
        {
            var EntradaRequest = new Dto.EntradaDto
            {
                IdPelicula = Entradas.IdPelicula,
                NomCliente = Entradas.NomCliente,
                Email = Entradas.Email,
                FlagEstado = 1,
                IdCodPromocion = Entradas.IdCodPromocion
            };

            var Result = await _movieApplication.ComprarEntrada(EntradaRequest);

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

    }
}
