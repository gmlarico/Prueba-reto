$(document).ready(function () {

    $("#btnComprar").click(async function () {

        var IdPelicula;
        var NomCliente;
        var Email;
        var IdCodPromocion;
        var IdSelectGenero;
        var Cupon;

        IdPelicula = $('#IdPelicula').val();
        NomCliente = $.trim($('#IdNombre').val());
        Email = $.trim($('#IdMail').val());
        IdCodPromocion = $.trim($('#IdCupon').val());
        IdSelectGenero = $('#IdSelectGenero').val();

        if(NomCliente == '')
        {
            window.alert('Completar Nomble Cliente')
            return;
        }
        if(Email == '')
        {
            window.alert('Completar Email')
            return;
        }

        try {
            if (IdCodPromocion != '') {
                Cupon = await ValidarCupon(IdCodPromocion);
                
                debugger
           
                if (Cupon === undefined) {
                    window.alert('El cupón no existe');
                } else {
                    var Genero = Cupon.detalleCupones.idGender;
                    if (Genero == IdSelectGenero || Genero === null) {
                        // Hacer algo si el cupón es válido
                        GuardarEntrada(IdPelicula, NomCliente, Email, IdCodPromocion);

                    } else {
                        window.alert('Este cupón no pertenece a este género');
                    }
                }
            } else {
                GuardarEntrada(IdPelicula, NomCliente, Email, IdCodPromocion);
            }
        } catch (error) {
            // Manejar errores de la solicitud AJAX
            console.error('Error en la solicitud AJAX:', error);
        }
    });

    
});


function ValidarCupon(IdCodPromocion) {
    return new Promise(function (resolve, reject) {
        var CodValidacion = {
            IdCodPromocion: IdCodPromocion
        };

        $.ajax({
            type: 'POST',
            dataType: "JSON",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(CodValidacion),
            url: '/Entradas/BuscarPromocion',
            success: function (EntradasRequest) {
                debugger;

                if (EntradasRequest.detalleCupones.idCodPromocion !== null) {
                    //window.alert('Se realizó la operación correctamente.');
                    resolve(EntradasRequest);
                } else {
                    reject('El cupón no existe.');
                }
            },
            error: function (xhr, status, error) {
                reject(error);
            }
        });
    });
}


function GuardarEntrada(IdPelicula, NomCliente, Email, IdCodPromocion) {

    var EntradasRequest = {
        IdPelicula: IdPelicula,
        NomCliente: NomCliente,
        Email: (Email == '' ? null : Email),
        IdCodPromocion: (IdCodPromocion == '' ? null : IdCodPromocion),
    };

    $.ajax({
        type: 'POST',
        dataType: "JSON",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(EntradasRequest),
        url: '/Entradas/GuardarEntrada',
        success: function (EntradasRequest) {
            debugger

            if (EntradasRequest.descripcion == 'OK') {
                window.alert('Se realizo la operación correctamente.')
                $(location).attr("href", "/Movies");

            } else { 

                window.alert('Ocurrio un problema.')

            }
            
        }
    })

};
