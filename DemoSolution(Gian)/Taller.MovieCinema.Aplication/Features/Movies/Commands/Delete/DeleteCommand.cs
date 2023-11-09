using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.MovieCinema.Domain.Repositories;

namespace Taller.MovieCinema.Aplication.Features.Movies.Commands.Delete
{
    public class DeleteCommand: IRequest
    {
        public int Id { get; set; }

        public class DeleteCommandHandler : IRequestHandler<DeleteCommand>
        {
            private readonly IMoviesRepository _moviesRepository;
            public DeleteCommandHandler(IMoviesRepository moviesRepository)
            {
                _moviesRepository = moviesRepository;
            }
            public async Task Handle(DeleteCommand request, CancellationToken cancellationToken)
            {
                await _moviesRepository.Delete(request.Id);
            }
        }  

    }
}
