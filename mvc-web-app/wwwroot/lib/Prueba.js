$(function () {

    debugger
    var ID
    var Nombre
    var Estado
    var FechaProducto

    ID = 1231231;
    Nombre = "asdasd";

    var model = {
        Name: "asdas"
    }; 

    $.ajax({
        type: 'POST',
        dataType: "JSON",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(model),
        url: '/Movies/Edit',
        success: function (ListarProductos) {
            debugger


            if (ListarProductos.length > 0) {

                //for (var i = 0; i < ListarProductos.length; i++) {

                //    var Productos = '<tr>' +
                //        '<th class="text-center" scope="row">' + ListarProductos[i].ID + '</th>' +
                //        '<td>' + ListarProductos[i].NOMBRE + '</td>' +
                //        '<td class="d-none d-sm-table-cell">' +
                //        ListarProductos[i].PRECIO +
                //        '</td>' +
                //        '<td class="text-center">' +
                //        '<button type="button" class="btn btn-primary min-width-125">Editar</button>' +
                //        ' </td>' +
                //        '</tr>'

                //    $("#TablaProductosCuerpo").append(Productos);

                //}

            }

        }
    })
});