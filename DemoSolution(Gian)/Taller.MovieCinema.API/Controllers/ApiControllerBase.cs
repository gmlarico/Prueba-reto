using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Taller.MovieCinema.API.Controllers
{
    //PARA EL USO DE MEDIATER
    public abstract class ApiControllerBase: ControllerBase
    {
        private ISender _mediator = null!;

        protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();
    }
}
