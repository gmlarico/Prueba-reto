ns('Resinplast.Indicadores.Web.Components');
Resinplast.Indicadores.Web.Components.ProgressBar = function (opts) {
    this.init(opts);
};

Resinplast.Indicadores.Web.Components.ProgressBar.prototype = {
    isProgressBar: null,

    idDivDialog: 'divProgressDialogResinplast',
    idDivProgrees: 'divProgressResinplast',
    idDivLoading: 'divLoadingResinplast',

    init: function (opts) {
        this.isProgressBar = opts.isProgressBar ? opts.isProgressBar : false;

        this._privateFunction.createProgressBar.apply(this, [opts]);
    },

    setMaxValue: function (max) {
        if (this.divProgress) {
            this.divProgress.progressbar('option', 'max', max);
        }
    },

    setValue: function (value) {
        if (this.divProgress) {
            this.divProgress.progressbar('option', 'value', value);
        }
    },

    getValue: function () {
        var value = null;

        if (this.divProgress) {
            value = this.divProgress.progressbar('option', 'value');
        }

        return value;
    },

    show: function () {
        if (this.divDialog) {
            this.divDialog.dialog('open');
        }
        else {
            if (this.divProgress) {
                this.divProgress.show();
            }
        }
    },

    hide: function () {
        if (this.divDialog) {
            this.divDialog.dialog('close');
        }
        else {
            if (this.divProgress) {
                this.divProgress.hide();
            }
            else {
                this.divLoading.hide();
            }
        }
    },

    destroy: function () {
        if (this.divProgress) {
            this.divProgress.progressbar('destroy');
            this.divProgress.remove();
        }

        if (this.divLoading) {
            this.divLoading.remove();
        }

        if (this.divDialog) {
            this.divDialog.dialog('destroy');
            this.divDialog.remove();
        }
    },

    _privateFunction: {
        createProgressBar: function (opts) {
            if (!opts.targetLoading) {
                this.divDialog = this._privateFunction.implementDialogElement.apply(this, [opts]);
                opts.targetLoading = this.divDialog;
            }
            else {
                opts.targetLoading = $('#' + opts.targetLoading);
            }

            if (this.isProgressBar) {
                this.divProgress = this._privateFunction.implementProgressElement.apply(this, [opts.targetLoading, opts.maxValue]);
            }
            else {
                opts.targetLoading.addClass("bg-transparent");
                this.divLoading = this._privateFunction.implementLoading.apply(this, [opts.targetLoading]);
            }
        },

        implementProgressElement: function (targetLoading, maxValue) {
            var divProgress = $('#' + this.idDivProgrees);
            if (divProgress.length == 0) {
                divProgress = $('<div />');
                divProgress.attr('id', this.idDivProgrees);
                divProgress.addClass("progressBar-resinplast");
                divProgress.append($('<div class="progressBar-resinplast-label"></div>'));

                if (Resinplast.Indicadores.Web.Shared.General.Resources) {
                    divProgress.find('.progressBar-resinplast-label').text(Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaCargando);
                }

                targetLoading.append(divProgress);
            }

            if (targetLoading) {
                divProgress.css('position', 'relative');
                divProgress.css('top', '0px');
                divProgress.css('left', '0px');
            }

            var me = this;
            var config = {
                value: maxValue ? 0 : false,
                change: function () {
                    if (me.getValue() != false) {
                        divProgress.find('.progressBar-resinplast-label').text(me.getValue() + "%");
                    }
                }
            };

            if (maxValue) {
                config.max = maxValue;
            }

            divProgress.progressbar(config);
            return divProgress;
        },

        implementLoading: function (targetLoading) {
            var divLoading = $('#' + this.idDivLoading);

            if (divLoading.length == 0) {
                divLoading = $('<div />');
                divLoading.attr('id', this.idDivLoading);
                divLoading.addClass("text-center");
                divLoading.append($('<i class="fa fa-5x fa-refresh fa-spin text-resinplast-azul"></i>'));

                targetLoading.append(divLoading);
            }

            if (targetLoading) {
                divLoading.css('position', 'relative');
                divLoading.css('top', '0px');
                divLoading.css('left', '0px');
            }

            return divLoading;
        },

        implementDialogElement: function (opts) {
            //debugger
            var div = $('#' + this.idDivDialog);

            if (div.length == 0) {
                div = $('<div />');
                div.attr('id', this.idDivDialog);
                $('body').append(div);
            }

            div.dialog({
                dialogClass: "no-close-progress",
                closeOnEscape: false,
                //height: 100,
                width: 220,
                modal: opts.modal ? opts.modal : true,
                resizable: false,
                title: 'Loading...'
            });

            return div;
        }
    }
};