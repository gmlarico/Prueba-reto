ns('Resinplast.Indicadores.Web.Components');
Resinplast.Indicadores.Web.Components.Calendar = function (opts) {
    this.init(opts);
};

Resinplast.Indicadores.Web.Components.Calendar.prototype = {
    inputFrom: null,
    inputTo: null,
    divDateRange: null,
    btnToDay: null,
    styleBtnToDay: null,

    init: function (opts) {
        if (opts) {
            this.inputFrom = opts.inputFrom ? opts.inputFrom : null;
            this.inputTo = opts.inputTo ? opts.inputTo : null;
            this.divDateRange = opts.divDateRange ? opts.divDateRange : null;
            this.btnToDay = (opts.btnToDay != undefined && opts.btnToDay != null) ? opts.btnToDay : true;
            this.styleBtnToDay = this.btnToDay ? "linked" : false;
            var me = this;
        }
        
        var configDatepicker = {
            format: Resinplast.Indicadores.Web.Global.Format.Date.toLowerCase(),
            language: Resinplast.Indicadores.Web.Global.Format.Language.toLowerCase(),
            todayHighlight: me.btnToDay,
            todayBtn: me.styleBtnToDay,
            //orientation: 'bottom',
            autoclose: true
        };

        /***************************************** inputFrom *****************************************/
        if (this.inputFrom && this.inputFrom != null) {
            this.inputFrom.datepicker(configDatepicker);
            this.inputFrom.keypress(function (evento) { return validarFormatoFecha((this), evento); });
            this.inputFrom.change(fnFormsReset());
        }

        /***************************************** inputTo *****************************************/
        if (this.inputTo && this.inputTo != null) {
            this.inputTo.datepicker(configDatepicker);
            this.inputTo.keypress(function (evento) { return validarFormatoFecha((this), evento); });
            this.inputTo.change(fnFormsReset());
        }

        /***************************************** inputTo *****************************************/
        if (this.divDateRange && this.divDateRange != null) {
            this.divDateRange.datepicker(configDatepicker);
        }
    },

    destroy: function () {
        if (this.inputFrom) {
            this.inputFrom.datepicker("destroy");
        }

        if (this.inputTo) {
            this.inputTo.datepicker("destroy");
        }
    }
};