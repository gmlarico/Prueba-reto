$(document).ready(function () {

    ListarCupones();


});

function ListarCupones() {

    $("#TablaPromocionesCuerpo").empty();

    $.ajax({
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        url: '/Promociones/ListarCupones',
        success: function (ListarCupones) {
            debugger


            if (ListarCupones.length > 0) {

                for (var i = 0; i < ListarCupones.length; i++) {

                    //window.alert(ListarCupones[i].idCodPromocion);

                    var Cupones = '<tr>' +
                        '<th class="text-center" scope="row">' + ListarCupones[i].idCodPromocion + '</th>' +
                        '<td>' + ListarCupones[i].idGender + '</td>' +
                        '<td class="d-none d-sm-table-cell">' + ListarCupones[i].descripcion + '</td>' +
                        '<td class="d-none d-sm-table-cell">' + ListarCupones[i].fechaInicio + '</td>' +
                        '<td class="d-none d-sm-table-cell">' + ListarCupones[i].fechaFin + '</td>' +
                        '<td class="text-center">' + '<button type="button" class="btn btn-primary min-width-125">Editar</button>' + ' </td>' +
                        '</tr>'

                    $("#TablaPromocionesCuerpo").append(Cupones);

                }

            }

        }
    });



};