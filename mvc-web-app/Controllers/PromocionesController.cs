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
    public class PromocionesController : Controller
    {
        private readonly MoviesDbContext _context;
        private readonly IUserApplication _userApplication;
        private IWebHostEnvironment Environment;
        private string baseUploadUrl = "uploads";
        private readonly IMovieApplication _movieApplication;


        public PromocionesController(MoviesDbContext context, IUserApplication userApplication, IWebHostEnvironment _environment, IMovieApplication movieApplication)
        {
            _context = context;
            _userApplication = userApplication;
            Environment = _environment;
            _movieApplication = movieApplication;

        }

        public IActionResult Promociones()
        {
            return View();
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


        private async void InitializeFilters(MoviesBaseViewModel model)
        {

            var generos = await _movieApplication.ListarGenero();

            var genders = generos.ToList();

            model.GenderList = new SelectList(genders, "Id", "Name");

        }
    }
}
