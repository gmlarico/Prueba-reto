ns('Resinplast.Indicadores.Web.Components.Message');
Resinplast.Indicadores.Web.Components.Message = function (opts) {
    this.init(opts);
};

Resinplast.Indicadores.Web.Components.Message.prototype = {
    init: function (opts) {
        this._privateFunction.createMessage.apply(this, [opts]);
        ResultConfirm = false;
    },

    ResultConfirm: false,

    Information: function (opts) {
        swal.setDefaults({ confirmButtonClass: 'btn btn-hero btn-outline-info m-5' });

        if (typeof (opts) === "undefined") {
            opts = [];
            opts.title = Resinplast.Indicadores.Web.Shared.Message.Resources.Informacion;
            opts.message = null;
        }
        else {
            opts.title = opts.title ? opts.title : Resinplast.Indicadores.Web.Shared.Message.Resources.Informacion;
            opts.message = opts.message ? opts.message : null;
        }

        opts.type = 'info';

        this._privateFunction.show.apply(this, [opts]);
    },

    Success: function (opts) {
        swal.setDefaults({
            confirmButtonClass: 'btn btn-hero btn-outline-success m-5',
            timer: 3000
        });

        if (typeof (opts) === "undefined") {
            opts = [];
            opts.title = Resinplast.Indicadores.Web.Shared.Message.Resources.Exito;
            opts.message = null;
        }
        else {
            opts.title = opts.title ? opts.title : "Exito";
            opts.message = opts.message ? opts.message : null;
        }

        opts.type = 'success';

        this._privateFunction.show.apply(this, [opts]);
    },

    SuccessNoTime: function (opts) {
        swal.setDefaults({ confirmButtonClass: 'btn btn-hero btn-outline-success m-5' });

        if (typeof (opts) === "undefined") {
            opts = [];
            opts.title = Resinplast.Indicadores.Web.Shared.Message.Resources.Exito;
            opts.message = null;
        }
        else {
            opts.title = opts.title ? opts.title : Resinplast.Indicadores.Web.Shared.Message.Resources.Exito;
            opts.message = opts.message ? opts.message : null;
        }

        opts.type = 'success';

        this._privateFunction.show.apply(this, [opts]);
    },

    Warning: function (opts) {
        debugger
        swal.setDefaults({ confirmButtonClass: 'btn btn-hero btn-outline-warning m-5' });

        if (typeof (opts) === "undefined") {
            opts = [];
            opts.title = Resinplast.Indicadores.Web.Shared.Message.Resources.Advertencia;
            opts.message = null;
        }
        else {
            opts.title = opts.title ? opts.title : "Advertencia";
            opts.message = opts.message ? opts.message : null;
        }

        opts.type = 'warning';

        this._privateFunction.show.apply(this, [opts]);
    },

    Error: function (opts) {
        swal.setDefaults({ confirmButtonClass: 'btn btn-hero btn-outline-danger m-5' });

        if (typeof (opts) === "undefined") {
            opts = [];
            opts.title = Resinplast.Indicadores.Web.Shared.Message.Resources.Error;
            opts.message = null;
        }
        else {
            opts.title = opts.title ? opts.title : Resinplast.Indicadores.Web.Shared.Message.Resources.Error;
            opts.message = opts.message ? opts.message : null;
        }

        opts.type = 'error';

        this._privateFunction.show.apply(this, [opts]);
    },

    _privateFunction: {
        createMessage: function (opts) {
            swal.setDefaults({
                buttonsStyling: false,
                focusConfirm: false,
                confirmButtonClass: 'btn btn-lg btn-alt-success m-5',
                cancelButtonClass: 'btn btn-lg btn-alt-danger m-5',
                inputClass: 'form-control',
                allowOutsideClick: false
            });
        },

        show: function (opts) {
            swal(opts.title, opts.message, opts.type);
        }
    }
}