function obtenerKeyCode(evento) {
    return evento.keyCode ? evento.keyCode : evento.which ? evento.which : evento.charCode;
}

function applyToolTipGrid(divGrid) {
    if (divGrid != undefined) {
        var inputs = new Array();
        inputs = divGrid.find('[data-toggle="tooltip"]');

        $.each(inputs, function (index, value) {
            var input = $(value);
            input.tooltip('dispose');
            input.tooltip({
                trigger: 'hover',
                placement: 'auto'
            });
        });
    }
}

function applyToolTipButtons(container) {
    var classContainer = false;

    var buttons = new Array();

    if (container == undefined) {
        buttons = $('button[type=button]');
    } else {
        buttons = container.find('button[type=button]');
        classContainer = container;
    }

    $.each(buttons, function (index, value) {
        var button = $(value);

        //button.tooltip('dispose');

        //switch (button[0].id) {
        //    case 'btnConsultar':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaConsultar,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnNuevo':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaNuevo,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnGenerar':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaGenerar,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnLimpiar':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaLimpiar,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnGrabar':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaGrabar,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnSalir':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaSalir,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnNuevoGrabar':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaGrabar,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnNuevoSalir':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaSalir,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnEditarGrabar':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaGrabar,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnEditarSalir':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaSalir,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnDetalleNuevo':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaNuevo,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnDetalleGrabar':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaGrabar,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnDetalleSalir':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaSalir,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnDetalleAgregar':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaDetalleAgregar,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnUnidadMedidaGrabar':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaGrabar,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnUnidadMedidaSalir':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaSalir,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnCodigoBarraNuevo':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaNuevo,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnCodigoBarraGrabar':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaGrabar,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnCodigoBarraSalir':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaSalir,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnHuellaNuevo':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaNuevo,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnHuellaGrabar':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaGrabar,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnHuellaSalir':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaSalir,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnGenerarConsultar':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaConsultar,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnGenerarLimpiar':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaLimpiar,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnGenerarSalir':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaSalir,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnUbicacionSalir':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaSalir,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnVisualizarConteoConfirmar':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaConfirmar,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnCortoSalir':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaSalir,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnVisualizarConteoSalir':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaSalir,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

        //    case 'btnNuevoConteo':
        //        button.tooltip({
        //            title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaNuevoConteo,
        //            trigger: 'hover',
        //            placement: 'auto',
        //            container: classContainer
        //        });
        //        break;

            //////case 'btnAgregarDetalleNuevo':
            //////    button.tooltip({
            //////        title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaDetalleAgregar,
            //////        trigger: 'hover',
            //////        placement: 'auto',
            //////        container: classContainer
            //////    });
            //////    break;

            ////case 'btnGrabarDetalleNuevo':
            ////    button.tooltip({
            ////        title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaGrabarDetalleNuevo,
            ////        trigger: 'hover',
            ////        placement: 'auto',
            ////        container: classContainer
            ////    });
            ////    break;

            ////case 'btnSalirDetalleNuevo':
            ////    button.tooltip({
            ////        title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaSalir,
            ////        trigger: 'hover',
            ////        placement: 'auto',
            ////        container: classContainer
            ////    });
            ////    break;

            //////case 'btnGenerarEnvio':
            //////    button.tooltip({
            //////        title: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaEnvioGenerar,
            //////        trigger: 'hover',
            //////        placement: 'auto',
            //////        container: classContainer
            //////    });
            //////    break;
        //}
    });
}

function applyToolTipForce(container) {
    var classContainer = false;

    var myObjects = new Array();

    if (container == undefined) {
        myObjects = $('[data-toggle="tooltip"]');
    } else {
        myObjects = container.find('[data-toggle="tooltip"]');
        classContainer = container;
    }

    $.each(myObjects, function (index, value) {
        var myObject = $(value);
        myObject.tooltip('dispose');
        myObject.tooltip({
            trigger: 'hover',
            container: classContainer
        });
    });
}

function fnFormsReset(container) {
    var inputs = new Array();

    if (container == undefined) {
        inputs = $('.form-material.floating > .form-control');
    } else {
        inputs = container.divDialog.find('.form-material.floating > .form-control');
    }

    $.each(inputs, function (index, value) {
        var input = $(value);
        var parent = input.parent('.form-material');

        if (input.val() && input.val().length > 0) {
            parent.addClass('open');
        } else {
            parent.removeClass('open');
        }
    });
}

function validarSoloNumeros(evento) {
    evento = (evento) ? evento : event;

    var key = evento.keyCode ? evento.keyCode : evento.which ? evento.which : evento.charCode;
    var respuesta = false;

    if (key >= 48 && key <= 57)
    { respuesta = true; }

    if (evento.charCode == 0)/*direccionales*/
    { respuesta = true; }

    if (key == 13)/*enter*/
    { respuesta = true; }

    return respuesta;
}

function validarFormatoFecha(campo, evento) {
    var fecha = campo.value;
    evento = (evento) ? evento : event;

    var key = evento.keyCode ? evento.keyCode : evento.which ? evento.which : evento.charCode;

    if (evento && key == 8) { /* retroceso */
        return true;
    }

    if (evento.charCode == 0)/*direccionales*/
        return true;

    if (fecha.length < 10) {
        var ultimo = String.fromCharCode((evento.charCode) ? evento.charCode : ((evento.keyCode) ? evento.keyCode : ((evento.which) ? evento.which : 0)));
        if (validarSoloNumeros(evento)) {
            if (fecha.length < 2) {
                var dia = fecha + ultimo;
                if (dia <= 31) {
                    if (fecha.length == 1) dia = dia + '/';
                    fecha = dia;
                }
            } else {
                if (fecha.length < 5) {
                    var mes = fecha.substr(3, fecha.length - 1) + ultimo;
                    if (mes <= 12) {
                        if (fecha.length == 4) mes = mes + '/';
                        fecha = fecha.substr(0, 3) + mes;
                    }
                } else {
                    fecha = fecha + ultimo;
                }
            }
        }
    }

    campo.value = fecha;

    return false;
}

function validarCampoFecha(value) {
    var date_regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    return date_regex.test(value);
};

function obtenerValorCopy(e) {
    var texto = "";
    if (window.clipboardData) {
        texto = window.clipboardData.getData('Text');
    }
    else {
        texto = e.originalEvent.clipboardData.getData('text/plain');
    }
    return texto;
}

function validarCopyFecha(e) {
    var texto = obtenerValorCopy(e);
    return validarCampoFecha(texto);
}

function validarFechaOnBlur(objeto) {
    var ok = true;
    if (objeto.value.length < 10)
        ok = false;
    else {
        try {
            var date = $.datepicker.parseDate(Resinplast.Indicadores.Web.Global.Format.Date, objeto.value);
            ok = (date.getFullYear() >= 1900)
        }
        catch (err) {
            ok = false;
        }
    }

    if (!ok)
        $('#' + objeto.id).val('');

    return ok;
}

function applyUppercaseFirstLetter(value) {
    strVal = '';
    value = value.split(' ');

    for (var chr = 0; chr < value.length; chr++) {
        strVal += value[chr].substring(0, 1).toUpperCase() + value[chr].substring(1, value[chr].length).toLowerCase() + ' '
    }

    return strVal
}

function generateNewID(valCode, valDescription) {
    var resultID = applyUppercaseFirstLetter(valDescription).replace(' ', '') + '_' + valCode;
    return resultID
}

function SmoothScrollTo(id_or_Name, timelength) {
    console.log("AA");
    var timelength = timelength || 1000;
    $('html, body').animate({
        scrollTop: $(id_or_Name).offset().top - 70
    }, timelength, function () {
        window.location.hash = id_or_Name;
    });
}

// jquery extend function
function redirectPost(location, args) {
    var form = '';
    $.each(args, function (key, value) {
        form += '<input type="hidden" name="' + key + '" value="' + value + '">';
    });
    var submit = $('<form action="' + location + '" method="POST" target="blank">' + form + '</form>');
    $('body').after(submit);
    submit.submit();
}