$(document).ready(function () {

   

    $("#btnComprar").click(async function () {

        var IdCodigoCupon;
        var IdDescripcion;
        var idFechaIni;
        var IdCodPromocion;
        var IdSelectGenero;
        var idFechaFin;
        debugger;

        

        IdCodigoCupon = $.trim($('#IdCodigoCupon').val());
        IdDescripcion = $.trim($('#IdDescripcion').val());
        idFechaIni = $('#idFechaIni').val();
        idFechaFin = $('#idFechaFin').val();
        IdSelectGenero = $('#IdSelectGenero').val();
        CrearCupon(IdCodigoCupon, IdSelectGenero, IdDescripcion, idFechaIni, idFechaFin)
    });
       

});


function CrearCupon(IdCodPromocion, IdGender, Descripcion, FechaInicio, FechaFin) {

    var CuponesRequest = {
        IdCodPromocion: IdCodPromocion,
        IdGender: (IdGender == '' ? null : IdGender), 
        Descripcion: (Descripcion == '' ? null : Descripcion),
        FechaInicio: FechaInicio,
        FechaFin: FechaFin
    };

    $.ajax({
        type: 'POST',
        dataType: "JSON",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(CuponesRequest),
        url: '/Promociones/GenerarPromocion',
        success: function (CuponesRequest) {
            debugger

            if (CuponesRequest.descripcion == 'OK') {
                window.alert('Se realizo la operación correctamente.')
                $(location).attr("href", "/Promociones/Promociones");

            } else {

                window.alert('Ocurrio un problema.')

            }

        }
    });



};

function obtenerFechaActual() {
    var fecha = new Date();
    var año = fecha.getFullYear();
    var mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    var dia = fecha.getDate().toString().padStart(2, "0");
    return año + "-" + mes + "-" + dia;
}


