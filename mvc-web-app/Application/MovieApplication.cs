using demo_0.Domain.Entities;
using demo_0.Dto;
using demo_0.Shared;
using Microsoft.AspNetCore.Http.HttpResults;

namespace demo_0.Application
{
    public class MovieApplication:IMovieApplication
    {
        private readonly IHttpClientFactory _httpClientFactory;
        public MovieApplication(IHttpClientFactory httpClientFactory) 
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<List<MovieDto>> FindAll()
        {

            HttpClient client = _httpClientFactory.CreateClient("movies");
            using HttpResponseMessage response = await client.GetAsync($"Movies/BuscarTodo");
            response.EnsureSuccessStatusCode();
            var result = await response.Content.ReadFromJsonAsync<List<MovieDto>>();

            return result!;
        }

      

        public async Task Update(MovieDto movie)
        {

            var json = movie.CreateAsHttpContent();

            HttpClient client = _httpClientFactory.CreateClient("movies");
            using HttpResponseMessage response = await client.PutAsync($"Movies/EditarPelicula", json);
            var sad = response.EnsureSuccessStatusCode();
        }

        public async Task<MovieDto> FindById(MovieIdDto MovieId)
        {
            var json = MovieId.CreateAsHttpContent();

            HttpClient client = _httpClientFactory.CreateClient("movies");
            using HttpResponseMessage response = await client.PostAsync($"Movies/BusquedaId", json);
            response.EnsureSuccessStatusCode();
            var result = await response.Content.ReadFromJsonAsync<MovieDto>();

            return result!;
        }


        public async Task<List<GenderDto>> ListarGenero()
        {

            HttpClient client = _httpClientFactory.CreateClient("movies");
            using HttpResponseMessage response = await client.GetAsync($"Movies/ListarGeneros");
            response.EnsureSuccessStatusCode();
            var result = await response.Content.ReadFromJsonAsync<List<GenderDto>>();

            return result!;
        }

        public async Task<CuponesDto> BuscarCuponId(string IdCodPromocion)
        {
            var json = IdCodPromocion.CreateAsHttpContent();

            HttpClient client = _httpClientFactory.CreateClient("movies");
            using HttpResponseMessage response = await client.PostAsync($"Movies/BusquedaPromo", json);
            response.EnsureSuccessStatusCode();
            var result = await response.Content.ReadFromJsonAsync<CuponesDto>();

            return result!;
        }

        public async Task<List<CuponesDto>> ListaCupones()
        {
            HttpClient client = _httpClientFactory.CreateClient("movies");
            using HttpResponseMessage response = await client.GetAsync($"Movies/ListarPromo");
            response.EnsureSuccessStatusCode();
            var result = await response.Content.ReadFromJsonAsync<List<CuponesDto>>();

            return result!;
        }

        public async Task<ControlDto> ComprarEntrada(EntradaDto Entrada)
        {
            var control = new ControlDto();
            var json = Entrada.CreateAsHttpContent();
            HttpClient client = _httpClientFactory.CreateClient("movies");
            using HttpResponseMessage response = await client.PostAsync($"Movies/ComprarTicket", json);

            control.Codigo = Convert.ToString(response.EnsureSuccessStatusCode());

            return control;
        }

        public async Task<ControlDto> CrearCupones(CuponesDto Cupon)
        {
            var control = new ControlDto();
             Cupon.FechaInicio = DateTime.Now;
            Cupon.FechaFin = DateTime.Now;
            var json = Cupon.CreateAsHttpContent();
            HttpClient client = _httpClientFactory.CreateClient("movies");
            using HttpResponseMessage response = await client.PostAsync($"Movies/CrearPromocion", json);

            control.Codigo = Convert.ToString(response.EnsureSuccessStatusCode());

            return control;
        }
    }
}
