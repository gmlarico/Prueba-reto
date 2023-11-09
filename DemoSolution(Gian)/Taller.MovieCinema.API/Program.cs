using Taller.MovieCinema.Infrastructure.Persistence;
using Taller.MovieCinema.Aplication;
using FluentValidation;
using Taller.MovieCinema.Aplication.Features.Movies.Commands.Create;
using Taller.MovieCinema.Infrastructure;
using Taller.MovieCinema.Infrastructure.Core.Audit;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();
//AQUI ESTAN LAS CLASES Y METODOS PARA EL LLAMADO A BASE DATOS O TABLAS - PERSISTENCIA
builder.Services.AddInfrastructurePersistence(builder.Configuration);

//AQUI ESTA EL METODO QUE VINCULA INFRAESTRUCTURE
builder.Services.AddInfrastructure();

//AQUI ESTA EL METODO QUE VINCULA APLICATION A PERSISTENCIA 
builder.Services.AddApplication();



//*************************************************************
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//ADICIONAR NUEVOS HEADER RESPONSE
app.UseMiddleware<AuditMiddleware>();


app.Use(async (context, next) => {

    Console.WriteLine("Middleware before");
    //var request = context.Request;
    //context.Response.Headers.Add("new-header-response", DateTime.Now.ToShortDateString());

    await next();

    Console.WriteLine("Middleware after");

});

app.UseAuthorization();

app.MapControllers();

app.Run();
