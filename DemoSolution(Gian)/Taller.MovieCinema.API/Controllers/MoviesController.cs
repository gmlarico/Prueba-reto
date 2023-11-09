using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Taller.MovieCinema.Aplication.Features.Movies;
using Taller.MovieCinema.Aplication.Features.Movies.Commands.Create;
using Taller.MovieCinema.Aplication.Features.Movies.Commands.Update;
using Taller.MovieCinema.Aplication.Features.Movies.Commands.Delete;
using Taller.MovieCinema.Aplication.Features.Movies.Queries.FindAll;
using Taller.MovieCinema.Aplication.Features.Movies.Queries.FindById;
using Taller.MovieCinema.Aplication.Features_applications;
using Taller.MovieCinema.Infrastructure.Core.Abstractions.Commands;
using Taller.MovieCinema.Infrastructure.Core.Abstractions.Queries;
using Taller.MovieCinema.Aplication.Features.Pomociones.Commands.Create;
using Taller.MovieCinema.Aplication.Features.Pomociones.Queries;
using Taller.MovieCinema.Aplication.Features.Entrada.Commands.Create;
using Taller.MovieCinema.Aplication.Features.Genders.Queries;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Taller.MovieCinema.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ApiControllerBase
    {
        //LLAMADO A LOS CONTRATOS CON LOS METODOS
        private readonly IMoviesApplication _moviesApplication;
        private readonly IFindMovieByGenderUseCase _findMovieByGenderUseCase;

        //SE IMPLEMENTARA ABSTRACCIONES PARA SU AUTOMATIZACION METODO SQRC
        private readonly IQueryDispatcher _queryDispatcher;
        private readonly ICommandDispatcher _commandDispatcher;


        //SE IMPLEMENTA MEDIATR
        //private readonly ISender _mediator = null!;
        private readonly IMediator _mediator;

        public MoviesController(IMoviesApplication moviesApplication, IFindMovieByGenderUseCase findMovieByGenderUseCase, IQueryDispatcher queryDispatcher,ICommandDispatcher commandDispatcher, IMediator mediator)
        {
            _moviesApplication = moviesApplication;
            _findMovieByGenderUseCase = findMovieByGenderUseCase;
            _queryDispatcher = queryDispatcher;
            _commandDispatcher = commandDispatcher;
            _mediator = mediator;

        }

        //// GET: api/values
        //[HttpGet]
        //public async Task<IActionResult> FindAll()
        //{
        //    return Ok(await _moviesApplication.FindAll());
        //}

        ////GET: api/values
        //[HttpGet("find/by-gender/{genderId}")]
        //public async Task<IActionResult> FindByGender(int genderId)
        //{
        //    return Ok(await _findMovieByGenderUseCase.Handle(genderId));
        //}

        //***********************************************************************************************************************
        //METODOS CQRS
        //VINCULA AL METODO HANDLER POR REQUEST Y RESPONSE (POR ESO TIENE QUE SER INDEPENDIENTE TODO)

        //LISTA TODOS CON ABSTRACCIONES
        // GET: api/values
        //[HttpGet]
        //public async Task<IActionResult> FindAll([FromQuery] FindAllQueryRequest request)
        //{
        //    var result = await _queryDispatcher.QueryAsync(request);
        //    return Ok(result);
        //}

        //LISTA TODOS CON Mediatr
        // GET: api/values
        [HttpGet]
        [Route("BuscarTodo")]
        public async Task<IActionResult> FindAll([FromQuery] FindAllQuery request)
        {
            var result = await Mediator.Send(request);
            return Ok(result);
        }

        //LISTA POR ID CON ABSTRACCIONES
        // GET: api/values
        [HttpPost]
        [Route("BusquedaId")]
        public async Task<IActionResult> FindById([FromBody] FindByIdQueryRequest request)
        {
            var result = await _queryDispatcher.QueryAsync(request);
            return Ok(result);
        }

        ////CREA UNA PELICULA CON ABSTRACCIONES
        //[HttpPost]
        //public async Task<IActionResult> Create([FromBody] CreateCommandRequest request)
        //{
        //    await _commandDispatcher.DispatchAsync(request);
        //    return Ok();
        //}

        //ELIMINA PELICULAS CON CQRS Y MEDIATR
        [HttpDelete]
        [Route("ElimianarPelicula")]
        public async Task<IActionResult> Delete(int id)
        {
       
            await Mediator.Send(new DeleteCommand { Id = id });
            return Ok();
        }

        //CREACION DE PELICULAR CON VALIDACIONES FLUETVALIDATO
        //[HttpPost]
        //[Route("CrearPelicula")]
        //public async Task<IActionResult> Create([FromBody] CreateCommandRequest request,
        //    [FromServices] IValidator<CreateCommandRequest> validator)
        //{

        //     var validateResult = await validator.ValidateAsync(request);
        //    if (!validateResult.IsValid)
        //    {

        //        StringBuilder sb = new StringBuilder();

        //        validateResult.Errors.ForEach(x => sb.AppendLine(x.ErrorMessage));

        //        return Problem(sb.ToString());
        //    }

        //    await _commandDispatcher.DispatchAsync(request);
        //    return Ok();
        //}

        [HttpPost]
        [Route("CrearPelicula")]
        public async Task<IActionResult> Create([FromBody] CreateCommand request)
        {
            await Mediator.Send(request);
            return Ok();
        }


        [HttpPut]
        [Route("EditarPelicula")]
        public async Task<IActionResult> Update([FromBody] UpdateCommand request)
        {
            //var token = Request.Headers["Authorization"];

            //if (!token.Any())
            //{
            //    return Forbid();
            //}

            await Mediator.Send(request);
            return Ok();
        }

        [HttpPost]
        [Route("ComprarTicket")]
        public async Task<IActionResult> ComprarTicket([FromBody] EntradasCommand request)
        {            
            await Mediator.Send(request);
            return Ok();
        }

        [HttpPost]
        [Route("CrearPromocion")]
        public async Task<IActionResult> CrearPromocion([FromBody] PromocionesCommand request)
        {
            await Mediator.Send(request);
            return Ok();
        }

        [HttpPost]
        [Route("BusquedaPromo")]
        public async Task<IActionResult> BusquedaPromo([FromBody] string? IdCodPromocion)
        {
            var request = new BuscarIdPromocionQuery{IdCodPromocion= IdCodPromocion};
            var result = await Mediator.Send(request);
            return Ok(result);
        }

        [HttpGet]
        [Route("ListarPromo")]
        public async Task<IActionResult> ListarPromo([FromQuery] ListarPromocionQuery request)
        {
            var result = await Mediator.Send(request);
            return Ok(result);
        }

        [HttpGet]
        [Route("ListarGeneros")]
        public async Task<IActionResult> ListarGeneros([FromQuery] ListarGenerosQuery request)
        {
            var result = await Mediator.Send(request);
            return Ok(result);
        }

    }
}



