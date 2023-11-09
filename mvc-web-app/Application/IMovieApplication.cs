
using demo_0.Dto;
using Microsoft.CodeAnalysis.Elfie.Diagnostics;

namespace demo_0.Application
{
    public interface IMovieApplication
    {
        Task<List<MovieDto>> FindAll();
        Task Update(MovieDto movie);
        Task<MovieDto> FindById(MovieIdDto MovieId);
        Task<List<GenderDto>> ListarGenero();
        Task<CuponesDto> BuscarCuponId(string IdCodPromocion);
        Task<List<CuponesDto>> ListaCupones();
        Task<ControlDto> ComprarEntrada(EntradaDto Entrada);
        Task<ControlDto> CrearCupones(CuponesDto Cupon);

    }
}
