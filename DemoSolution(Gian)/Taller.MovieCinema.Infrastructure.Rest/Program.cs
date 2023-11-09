using MediatR;
using Taller.MovieCinema.Infrastructure;
using Taller.MovieCinema.Infrastructure.Persistence;
using Taller.MovieCinema.Aplication;
using Taller.MovieCinema.Aplication.Features.Movies.Queries.FindAll;
using Taller.MovieCinema.Aplication.Features.Movies.Commands.Create;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddInfrastructure();
builder.Services.AddInfrastructurePersistence(builder.Configuration);
builder.Services.AddInfrastructurePersistence(builder.Configuration);

builder.Services.AddApplication();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();



//Routes
app.MapGet("api/movies", async (IMediator _mediator, ILogger<Program> _logger, [AsParameters] FindAllQuery query) =>
{
    //_logger.LogInformation("Ejecutando FindAllMovies");

    var result = await _mediator.Send(query);
    return Results.Ok(result);
})
.Produces<List<FindAllQueryItemResponse>>()
.WithName("findAllMovies")
.WithOpenApi();


app.MapPost("api/movies", async (IMediator _mediator, ILogger<Program> _logger, CreateCommand command) =>
{
    //_logger.LogInformation("Ejecutando FindAllMovies");

    await _mediator.Send(command);
    return Results.Ok();
})
.Produces<List<FindAllQueryItemResponse>>()
.WithName("createMovies")
.WithOpenApi();


app.Logger.LogInformation("Iniciando aplicación");

app.Run();


