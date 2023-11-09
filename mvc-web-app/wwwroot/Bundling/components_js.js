ns('Resinplast.Indicadores.Web.Components.Ajax');
Resinplast.Indicadores.Web.Components.Ajax = function (opts) {
    this.init(opts);
};

Resinplast.Indicadores.Web.Components.Ajax.prototype = {
    form: null,
    content: null,
    action: null,
    data: null,
    updatePanel: null,
    updateForm: null,
    objectCall: null,
    showLoading: null,
    targetLoading: null,
    autoSubmit: null,
    ajaxRequest: null,
    async: null,
    method: null,
    dataType: null,
    processData: null,
    hasFile: null,

    CONTENT_TYPE_POST: 'application/json; charset=utf-8',
    CONTENT_TYPE_GET: 'text/json;',
    CONTENT_TYPE_FORM: 'application/x-www-form-urlencoded',

    divProgress: null,

    init: function (opts) {
        this.async = this.async == false ? false : true;
        this.method = this.method ? this.method : 'POST';
        this.dataType = this.dataType ? this.dataType : 'json';
        this.showLoading = this.showLoading == false ? false : true;

        if (opts) {
            this.form = opts.form && opts.form != null ? document.getElementById(opts.form) : null;
            this.content = opts.content ? document.getElementById(opts.content) : null;
            this.action = opts.action && opts.action != null ? opts.action : (this.form != null && this.action == null) ? this.form.action : this.action;
            this.data = opts.data ? opts.data : {};
            this.updatePanel = opts.updatePanel ? $('#' + opts.updatePanel) : null;
            this.dataType = opts.dataType ? opts.dataType : (this.dataType && this.dataType != null) ? this.dataType : 'json';
            this.method = opts.method ? opts.method : 'POST';
            this.async = opts.async == false ? opts.async : true;
            this.processData = opts.processData == false ? opts.processData : true;
            this.hasFile = opts.hasFile == true ? opts.hasFile : false;
            this.onSuccess = opts.onSucces ? opts.onSucces : null; //Depreciado
            this.onSuccess = opts.onSuccess && this.onSuccess == null ? opts.onSuccess : this.onSuccess;
            this.onError = opts.onError ? opts.onError : this.onError;
            this.autoSubmit = opts.autoSubmit == false ? opts.autoSubmit : true;
            this.showLoading = opts.showLoading == false ? opts.showLoading : true;
            this.targetLoading = opts.targetLoading;
            this.updateForm = opts.updateForm && opts.updateForm != null ? document.getElementById(opts.updateForm) : null;

            if (this.autoSubmit) {
                this.submit();
            }
        }
    },

    dataJsonToForm: function (data) {
        if (data && data != null) {
            var valor = null;
            for (var i = 0; i < this.updateForm.elements.length; i++) {
                if (this.updateForm.elements[i].name && this.updateForm.elements[i].name != '') {
                    valor = data[this.updateForm.elements[i].name];

                    if (this.updateForm.elements[i].type.toUpperCase() == 'RADIO' || this.updateForm.elements[i].type.toUpperCase() == 'CHECKBOX') {
                        if (valor == null) {
                            valor = false;
                        }
                        this.updateForm.elements[i].checked = valor;
                    } else {
                        if (valor == null) {
                            valor = '';
                        }
                        this.updateForm.elements[i].value = valor;
                    }
                }
            }
        }
    },

    formToDataJSon: function () {
        this.data = this.data ? this.data : {};

        for (var i = 0; i < this.form.elements.length; i++) {
            if (this.form.elements[i].name && this.form.elements[i].name != '') {
                if (this.form.elements[i].type.toUpperCase() == 'RADIO' || this.form.elements[i].type.toUpperCase() == 'CHECKBOX') {
                    if (this.form.elements[i].checked) {
                        if (this.data[this.form.elements[i].name] != null) {
                            if (typeof this.data[this.form.elements[i].name] == 'string') {
                                var firstValueArray = this.data[this.form.elements[i].name];
                                this.data[this.form.elements[i].name] = null;
                                this.data[this.form.elements[i].name] = new Array();
                                this.data[this.form.elements[i].name][0] = firstValueArray;
                            }
                            this.data[this.form.elements[i].name][this.data[this.form.elements[i].name].length] = this.form.elements[i].value.toString().trim().toUpperCase();
                        }
                        else {
                            this.data[this.form.elements[i].name] = this.form.elements[i].value.toString().trim().toUpperCase();
                        }
                    }
                } else {
                    this.data[this.form.elements[i].name] = this.form.elements[i].value.toString().trim().toUpperCase();
                }
            }
        }

        return this.data;
    },

    contentToDataJSon: function () {
        this.data = this.data ? this.data : {};
        var ele = null;
        var name = '';
        var array = this.content.getElementsByTagName('*');

        for (var i = 0; i < array.length; i++) {
            ele = array[i];
            if ((ele.name && ele.name != '') || (ele.id && ele.id != '')) {
                name = (ele.id && ele.id != '') ? ele.id : '';
                name = (ele.name && ele.name != '') ? ele.name : name;
                if (ele.type.toUpperCase() == 'RADIO' || ele.type.toUpperCase() == 'CHECKBOX') {
                    if (ele.checked) {
                        this.data[name] = ele.value;
                        if (this.data[name] != null) {
                            if (typeof this.data[name] == 'string') {
                                var firstValueArray = this.data[name];
                                this.data[name] = null;
                                this.data[name] = new Array();
                                this.data[name][0] = firstValueArray;
                            }
                            this.data[name][this.data[name].length] = ele.value;
                        }
                        else {
                            this.data[name] = ele.value;
                        }
                    }
                } else {
                    this.data[name] = ele.value;
                }
            }
        }

        return this.data;
    },

    submit: function (customParam, opts) {
        if (typeof this.form == 'string') {
            this.form = document.getElementById(this.form);
        }

        if (this.action == null && this.form != null) {
            this.action = this.form.action;
        }

        if (this.ajaxRequest != null) {
            this.abort();
        }

        if (this.form != null)
            this.formToDataJSon();

        if (this.content != null)
            this.contentToDataJSon();

        var me = this;
        var config = {
            type: this.method,
            url: this.action,
            async: this.async,
            cache: false,
            contentType: (this.hasFile) ? false : (this.dataType.toUpperCase() == 'SCRIPT') ? this.CONTENT_TYPE_FORM : (this.method.toUpperCase() == 'GET') ? this.CONTENT_TYPE_GET : this.CONTENT_TYPE_POST,
            dataType: this.dataType,
            data: (this.method.toUpperCase() == 'GET' || this.hasFile) ? this.data : JSON.stringify(this.data),
            processData: this.processData,
            customParams: me.customParams,
            beforeSend: function (jqXHR, settings) {
                if (me.showLoading == true) {
                    if (me.loading == null) {
                        me.implementLoading();
                    }

                    me.loading.setValue(false);
                    me.loading.show();
                }
            }
        };

        if (opts) {
            for (var key in opts) {
                config[key] = opts[key];
            }
        }

        this.ajaxRequest = $.ajax(config);

        this.ajaxRequest.done(function (data) {
            if (data != null && data.Error != undefined && data.Error != null && data.Error.Code != 0) {
                alert(data.Error.Message);

                if (me.onError) {
                    me.onError(data.Error);
                }
            } else {
                if (me.updateForm != null) {
                    me.dataJsonToForm(data);
                }

                if (me.updatePanel != null) {
                    me.updatePanel.html(data);
                }

                if (me.showLoading == true && me.loading != null) {
                    me.loading.setValue(false);
                }

                if (me.onSuccess && me.onSuccess != null) {
                    me.onSuccess(data, customParam);
                }

                /*if (me.showLoading == true && me.loading != null) {
                    me.loading.setValue(100);
                }*/
            }

            me.data = null;
        });

        this.ajaxRequest.fail(function (jqXHR, textStatus, errorThrown) {
            if (!(textStatus == 'abort' && errorThrown == 'abort')) {
                if (me.onError) {
                    me.onError(errorThrown, textStatus, jqXHR);
                }
            }

            me.data = null;
        });

        this.ajaxRequest.always(function (jqXHR, textStatus) {
            if (me.showLoading == true && me.loading != null) {
                me.loading.hide();
            }
        });
    },

    send: function (data, onSuccess, onError) {
        this.data = data && data != null ? data : this.data;
        this.onSuccess = onSuccess ? onSuccess : this.onSuccess;
        this.onError = onError ? onError : this.onError;
        this.submit();
    },

    loading: null,

    implementLoading: function () {
        this.loading = new Resinplast.Indicadores.Web.Components.ProgressBar({ targetLoading: this.targetLoading });
    },

    abort: function () {
        if (this.ajaxRequest)
            this.ajaxRequest.abort();
    },

    onSuccess: null,
    onError: null
};
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
ns('Resinplast.Indicadores.Web.Components');
Resinplast.Indicadores.Web.Components.Dialog = function (opts) {
    this.init(opts);
};

Resinplast.Indicadores.Web.Components.Dialog.prototype = {
    idDivDialog: 'divDialogResinplast',
    noCloseButtonClass: 'no-close-dialog',

    init: function (opts) {
        this._privateFunction.createDialog.apply(this, [opts]);
    },

    setCloseOnEscape: function (value) {
        if (this.divDialog) {
            this.divDialog.progressbar('option', 'closeOnEscape', value);
        }
    },

    setCloseText: function (value) {
        if (this.divDialog) {
            this.divDialog.dialog('option', 'closeText', value);
        }
    },

    setDraggable: function (value) {
        if (this.divDialog) {
            this.divDialog.dialog('option', 'draggable', value);
        }
    },

    setHeight: function (value) {
        if (this.divDialog) {
            this.divDialog.dialog('option', 'height', value);
        }
    },

    setWidth: function (value) {
        if (this.divDialog) {
            this.divDialog.dialog('option', 'width', value);
        }
    },

    setMaxHeight: function (value) {
        if (this.divDialog) {
            this.divDialog.dialog('option', 'maxHeight', value);
        }
    },

    setMaxWidth: function (value) {
        if (this.divDialog) {
            this.divDialog.dialog('option', 'maxWidth', value);
        }
    },

    setMinHeight: function (value) {
        if (this.divDialog) {
            this.divDialog.dialog('option', 'minHeight', value);
        }
    },

    setMinWidth: function (value) {
        if (this.divDialog) {
            this.divDialog.dialog('option', 'minWidth', value);
        }
    },

    setModal: function (value) {
        if (this.divDialog) {
            this.divDialog.dialog('option', 'modal', value);
        }
    },

    setPosition: function (value) {
        if (this.divDialog) {
            this.divDialog.dialog('option', 'position', value);
        }
    },

    setResizable: function (value) {
        if (this.divDialog) {
            this.divDialog.dialog('option', 'resizable', value);
        }
    },

    setTitle: function (value) {
        if (this.divDialog) {
            this.divDialog.dialog('option', 'title', value);
        }
    },

    setClass: function (value) {
        if (this.divDialog) {
            this.divDialog.dialog('option', 'dialogClass', value);
        }
    },

    setButtons: function (value) {
        if (this.divDialog) {
            this.divDialog.dialog('option', 'buttons', value);
        }
    },

    getMainContainer: function () {
        return this.divDialog;
    },

    getHeight: function (value) {
        var value = undefined;
        if (this.divDialog) {
            value = this.divDialog.dialog('option', 'height');
        }
        return value;
    },

    getWidth: function (value) {
        var value = undefined;
        if (this.divDialog) {
            value = this.divDialog.dialog('option', 'width');
        }
        return value;
    },

    getPosition: function (value) {
        var value = undefined;
        if (this.divDialog) {
            value = this.divDialog.dialog('option', 'position');
        }
        return value;
    },

    getTitle: function (value) {
        var value = undefined;
        if (this.divDialog) {
            value = this.divDialog.dialog('option', 'title');
        }
        return value;
    },

    isModal: function (value) {
        var value = undefined;
        if (this.divDialog) {
            value = this.divDialog.dialog('option', 'modal');
        }
        return value;
    },

    isResizable: function (value) {
        var value = undefined;
        if (this.divDialog) {
            value = this.divDialog.dialog('option', 'resizable');
        }
        return value;
    },

    isOpen: function (value) {
        var value = undefined;
        if (this.divDialog) {
            value = this.divDialog.dialog('isOpen');
        }
        return value;
    },

    close: function () {
        if (this.divDialog && this.isOpen()) {
            this.divDialog.dialog('close');
        }
    },

    open: function () {
        if (this.divDialog && !this.isOpen()) {
            if (navigator.userAgent.indexOf('Chrome') != -1) {
                $(window).scrollTop(0);
                $("body").scrollTop(0);
            }

            this.close;
            this.divDialog.dialog('open');

            $("body").css("overflow", "hidden");
            $('.ui-dialog-titlebar-close').prop('title', '');
            $('.ui-dialog').css('overflow', 'visible');
            // onClosed: function(){ $("body").css("overflow", "auto"); }

            Codebase.helper('core-fn-uiHandleForms');
            Codebase.helper('core-tab');
            applyToolTipButtons(this.divDialog);
            applyToolTipForce(this.divDialog);
        }
    },

    moveToTop: function () {
        if (this.divDialog) {
            this.divDialog.dialog('moveToTop');
        }
    },

    setContent: function (html) {
        if (this.divDialog) {
            this.divDialog.html(html);
        }
    },

    getAjaxContent: function (opts) {
        var me = this;
        var ajaxBuscar = new Resinplast.Indicadores.Web.Components.Ajax({
            action: opts.action,
            dataType: 'html',
            data: opts.data,
            onSuccess: function (html) {
                me.setContent(html);
                //Resinplast.Indicadores.Web.Components.TextBox.Function.Configure(me.idDivDialog);
                if (opts.onSuccess) {
                    opts.onSuccess.apply(opts.scope ? opts.scope : me, [html, opts.customParam]);
                }
                opts.autoOpen = (opts.autoOpen == undefined || opts.autoOpen == null) ? true : opts.autoOpen;
                if (opts.autoOpen) {
                    me.open();
                    if (opts.afterOpen) {
                        opts.afterOpen.apply(opts.scope ? opts.scope : me, [html, opts.customParam]);
                    }
                }
                ////if (QuitarDrop) {
                ////    QuitarDrop();
                ////}
            }
        });
    },

    destroy: function () {
        if (this.divDialog) {
            this.divDialog.dialog('destroy');
            this.divDialog.remove();
        }
    },

    _privateFunction: {
        createDialog: function (opts) {
            if (!opts.target || opts.target == '') {
                this.divDialog = this._privateFunction.implementDialogElement.apply(this, [opts]);
            }
            else {
                this.divDialog = $('#' + opts.target);
            }

            this.divDialog.dialog(this._privateFunction.getConfig.apply(this, [opts]));
        },

        implementDialogElement: function (opts) {
            var div = $('<div />').uniqueId();
            this.idDivDialog = this.idDivDialog + div.attr('id');
            div.attr('id', this.idDivDialog);
            $('body').append(div);
            return div;
        },

        getConfig: function (opts) {
            var config = {
                autoOpen: opts.autoOpen ? opts.autoOpen : false,
                modal: opts.modal ? opts.modal : true,
                resizable: opts.resizable ? opts.resizable : false,
                show: { effect: "clip", duration: 400 },
                hide: { effect: "clip", duration: 50 },
                close: function () { $("body").css("overflow", "auto"); },
                showCloseButton: opts.showCloseButton ? opts.showCloseButton : false,
                closeOnEscape: opts.showCloseButton ? opts.showCloseButton : false,
            };

            if (opts) {
                for (var property in opts) {
                    config[property] = opts[property];
                }

                if (config.showCloseButton == false) {
                    config.dialogClass = config.dialogClass ? config.dialogClass + ' ' + this.noCloseButtonClass : this.noCloseButtonClass;
                }

                if (opts.close && opts.close != null) {
                    config.close = function () {
                        $("body").css("overflow", "auto");
                        opts.close();
                    };
                }
            }

            return config;
        }
    }
};
ns('Resinplast.Indicadores.Web.Components');
Resinplast.Indicadores.Web.Components.Grid = function (opts) {
    this.init(opts);
};

Resinplast.Indicadores.Web.Components.Grid.prototype = {
    identity: null,
    slickGrid: null,
    columns: null,
    dataView: null,
    showHeaderRow: null,
    explicitInitialization: null,
    renderTo: null,
    editable: null,
    enableAddRow: null,
    enableCellNavigation: null,
    autoEdit: null,

    divGrid: null,
    divPager: null,

    checkboxSelector: null,
    pager: null,
    isPager: null,
    isPagerauto: null,
    isPagerpageSize: null,
    isCheckboxSelector: null,
    isRadioButtonSelector: null,

    isServerPaging: null,
    serverProxy: null,
    autoHeight: null,
    forceFitColumns: null,
    fixedColumns: false,

    forceOrderData: null,

    inlineFilters: null,
    selectActiveRow: null,

    defaultHeight: '100',
    defaultWidth: '100%',

    width: null,
    minWidth: null,
    height: null,
    minHeight: null,
    headerRowHeight: null,
    applyTooltip: null,
    showHeaderCheckBox: null,
    showExportarExcel: null,
    namePropertyData: null,
    nameFileExcel: null,

    groupItemMetadataProvider: null,
    onLoad: null,
    onBeforeLoad: null,
    onToggleCheckboxRowSelection: null,
    tempDataSelected: null,
    isGetAll: false,
    idGridStorage: null,

    columnSizeOptional: null,
    indicatorGridInPopup: false,

    init: function (opts) {
        if (opts) {
            this.renderTo = '#' + opts.renderTo;
            this.divGrid = $(this.renderTo);
            this.width = opts.width ? opts.width : null;
            this.height = opts.height ? opts.height : null;
            this.showExportarExcel = opts.showExportarExcel != null ? opts.showExportarExcel : false;
            this.defaultHeight = opts.defaultHeight ? opts.defaultHeight : 25;
            this.applyTooltip = opts.applyTooltip && opts.applyTooltip != null ? opts.applyTooltip : true;
            this.isPager = opts.isPager && opts.isPager != null ? opts.isPager : false;
            this.isPagerauto = opts.isPagerauto && opts.isPagerauto != null ? opts.isPagerauto : '15';
            this.isPagerpageSize = opts.isPagerpageSize && opts.isPagerpageSize != null ? opts.isPagerpageSize : Resinplast.Indicadores.Web.Global.Grid.Options.PagerpageSize;
            this.isCheckboxSelector = opts.isCheckboxSelector && opts.isCheckboxSelector != null ? opts.isCheckboxSelector : false;
            this.isRadioButtonSelector = opts.isRadioButtonSelector && opts.isRadioButtonSelector != null ? opts.isRadioButtonSelector : false;
            this.isServerPaging = opts.isServerPaging && opts.isServerPaging != null ? opts.isServerPaging : false;
            this.editable = opts.editable ? opts.editable : true;
            this.enableAddRow = opts.enableAddRow ? opts.enableAddRow : false;
            this.enableCellNavigation = opts.onError ? opts.onError : true;
            this.autoEdit = opts.autoEdit ? opts.autoEdit : true;
            this.autoHeight = (opts.autoHeight != undefined && opts.autoHeight != null) ? opts.autoHeight : true;
            this.forceFitColumns = opts.forceFitColumns ? opts.forceFitColumns : false;
            this.fixedColumns = (opts.fixedColumns != undefined && opts.fixedColumns != null) ? opts.fixedColumns : false;

            this.forceOrderData = opts.forceOrderData ? opts.forceOrderData : false;

            this.inlineFilters = opts.inlineFilters ? opts.inlineFilters : false;
            this.selectActiveRow = opts.selectActiveRow ? opts.selectActiveRow : false;
            this.groupItemMetadataProvider = opts.groupItemMetadataProvider ? opts.groupItemMetadataProvider : null;

            this.namePropertyData = opts.namePropertyData ? opts.namePropertyData : null;
            this.nameFileExcel = opts.nameFileExcel ? opts.nameFileExcel : null;

            this.headerRowHeight = opts.headerRowHeight ? opts.headerRowHeight : 30;
            this.showHeaderRow = opts.showHeaderRow ? opts.showHeaderRow : false;
            this.showHeaderCheckBox = opts.showHeaderCheckBox != null && opts.showHeaderCheckBox != undefined ? opts.showHeaderCheckBox : true;
            this.explicitInitialization = opts.explicitInitialization ? opts.explicitInitialization : false;
            this.columns = opts.columns;
            this.onLoad = opts.onLoad ? opts.onLoad : null;
            this.onBeforeLoad = opts.onBeforeLoad ? opts.onBeforeLoad : null;
            this.onToggleCheckboxRowSelection = opts.onToggleCheckboxRowSelection ? opts.onToggleCheckboxRowSelection : null;
            this.idGridStorage = this.renderTo;

            if (opts.proxy) {
                this.setServerProxy(opts.proxy);
                this.idGridStorage = this.idGridStorage + '/' + this.serverProxy.ajax.action;
            }

            this.tempDataSelected = new Array();
            this.columnSizeOptional = opts.columnSizeOptional ? opts.columnSizeOptional : '43';
            this.indicatorGridInPopup = opts.indicatorGridInPopup ? opts.indicatorGridInPopup : false;
        }

        this.formatGrid();
        this.createGrid();
        this.idGridStorage = this.idGridStorage == null ? 'CurrentStatePage' : this.idGridStorage;

        if (Resinplast.Indicadores.Web.Global.Grid.Options.PreventPageState && Resinplast.Indicadores.Web.Global.Grid.Options.PreventPageState != null) {
            this.loadCurrentStatePage();
        }
    },

    getView: function () {
        return this.slickGrid;
    },

    getDataView: function () {
        return this.slickGrid.getData();
    },

    getColumns: function () {
        return this.slickGrid.getColumns();
    },

    createGrid: function () {
        this.createDataView();
        this.createSelector();

        ////this.dataView.getItemMetadata = function (index) {
        ////    if (index == 0) {
        ////        return { "cssClasses": "test" };
        ////    }
        ////};

        this.slickGrid = new Slick.Grid(this.renderTo, this.dataView, this.columns, {
            editable: this.editable,
            enableAddRow: this.enableAddRow,
            enableCellNavigation: this.enableCellNavigation,
            autoEdit: this.autoEdit,
            autoHeight: this.autoHeight,
            forceFitColumns: this.forceFitColumns,
            enableColumnReorder: this.fixedColumns,
            headerRowHeight: this.headerRowHeight,
            showHeaderRow: this.showHeaderRow,
            explicitInitialization: this.explicitInitialization,
            enableTextSelectionOnCells: true,
            columnSizeOptional: this.columnSizeOptional,
            indicatorGridInPopup: this.indicatorGridInPopup
        });

        this.slickGrid.getCanvas().css('min-height', '35px');
        this.createRowSelectionModel();
        this.createPager(this.isPagerauto, this.isPagerpageSize);
        this.createExportExcel();
        this.registerPlugin();
        this.implementsEvent();

        var me = this;
        //this.setData([]);
        if ($.browser.msie) {
            var me = this;
            $(window).scroll(function () {
                var actual = me.slickGrid.getViewportSelector().scrollLeft();
                me.slickGrid.getViewportSelector().scrollLeft((actual == 0 ? (actual + 1) : (actual - 1)));
                me.slickGrid.getViewportSelector().scrollLeft(actual);
            });
        }

        this.implementsToolTip();
    },

    implementsToolTip: function () {
        if (this.applyTooltip) {
            applyToolTipGrid(this.divGrid);
        }
    },

    implementsEvent: function () {
        var me = this;
        if (this.enableAddRow == true) {
            this.slickGrid.onAddNewRow.subscribe(function (e, args) {
                args.item.id = me.identity;
                me.getDataView().addItem(args.item);
                me.identity++;
            });
        }
    },

    implementsSort: function () {
        var me = this;
        if (this.forceOrderData == true) {
            this.slickGrid.onSort.subscribe(function (e, args) {
                var field = args.sortCol.field;
                var sign = args.sortAsc ? 1 : -1;

                me.getDataView().sort(function (dataRow1, dataRow2) {
                    value1 = dataRow1[field];
                    value2 = dataRow2[field];

                    var result = (value1 == value2 ? 0 : (value1 > value2 ? 1 : -1)) * sign;

                    return result;

                });
            });
        }
    },

    createDataView: function () {
        var me = this;
        this.dataView = new Slick.Data.DataView({ inlineFilters: this.inlineFilters, groupItemMetadataProvider: this.groupItemMetadataProvider });
        this.dataView.onRowCountChanged.subscribe(function (e, args) {
            me.slickGrid.updateRowCount();
            me.slickGrid.render();
        });

        this.dataView.onRowsChanged.subscribe(function (e, args) {
            me.slickGrid.invalidateRows(args.rows);
            me.slickGrid.render();
        });
    },

    createRowSelectionModel: function () {
        this.slickGrid.setSelectionModel(new Slick.RowSelectionModel({ selectActiveRow: this.selectActiveRow }));
    },

    createSelector: function () {
        var me = this;
        if (this.isCheckboxSelector) {
            this.checkboxSelector = new Slick.CheckboxSelectColumn({
                cssClass: 'slick-cell-checkboxsel',
                toolTip: Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaSeleccionarDeseleccionarTodos,
                showHeaderCheckBox: this.showHeaderCheckBox,
                onToggleRowSelection: function (rowId, isChecked) {
                    var objeto = me.slickGrid.getData().getItemById(rowId);
                    if (!isChecked) {
                        me.tempDataSelected = $.grep(me.tempDataSelected, function (value, index) {
                            return value.RowId != objeto.RowId;
                        });
                    }

                    if (me.onToggleCheckboxRowSelection && me.onToggleCheckboxRowSelection != null) {
                        me.onToggleCheckboxRowSelection([objeto], isChecked);
                    }
                },

                onHeaderClick: function (selectedAll) {
                    if (selectedAll) {
                        if (this.pager && this.pager != null) {
                            if (me.getPageInfo().totalRows > 0) {
                                me.closeToolTip();
                                me.load(true);
                                me.implementsToolTip();
                            }
                        }
                    }
                    else {
                        if (me.onToggleCheckboxRowSelection && me.onToggleCheckboxRowSelection != null) {
                            me.onToggleCheckboxRowSelection(me.tempDataSelected, false);
                        }
                        me.tempDataSelected = new Array();
                    }
                }
            });

            this.columns.splice(0, 0, this.checkboxSelector.getColumnDefinition());
        } else if (this.isRadioButtonSelector) {
            this.checkboxSelector = new Slick.RadioSelectColumn({
                cssClass: 'slick-cell-checkboxsel',
                toolTip: '',
                onToggleRowSelection: function (rowId, isChecked) {
                    if (isChecked) {
                        var objeto = me.slickGrid.getData().getItemById(rowId);
                        me.tempDataSelected = new Array();
                        me.tempDataSelected.push(objeto);
                    }
                }
            });

            this.columns.splice(0, 0, this.checkboxSelector.getColumnDefinition());
        }
    },

    createPager: function (auto, pageSize) {
        if (this.isPager) {
            this.createFooter();
            //this.divFooter.attr('pageauto', auto);//js

            var me = this;
            this.pager = new Slick.Controls.Pager(this.dataView, this.slickGrid, this.divFooter,
                {
                    defaultPageSize: pageSize,
                    onPageChange: function (serverPageInfo) {
                        if (!me.tempDataSelected) {
                            me.tempDataSelected = new Array();
                        }

                        if (me.isRadioButtonSelector) {
                            if (me.getSelectionData().length > 1) {
                                $.each(me.getSelectionData(), function (index, value) {
                                    var valido = true;
                                    $.each(me.tempDataSelected, function (indexT, temp) {
                                        if (value.RowId == temp.RowId) {
                                            valido = false;
                                            return valido;
                                        }
                                    });

                                    if (valido) {
                                        me.tempDataSelected = new Array();
                                        me.tempDataSelected.push(value);
                                        return false;
                                    }
                                });
                            } else {
                                me.tempDataSelected = me.getSelectionData();
                            }
                        }
                        else if (me.isCheckboxSelector) {
                            $.each(me.getSelectionData(), function (index, value) {
                                var valido = true;
                                $.each(me.tempDataSelected, function (indexT, temp) {
                                    if (value.RowId == temp.RowId) {
                                        valido = false;
                                        return valido;
                                    }
                                });

                                if (valido) {
                                    me.tempDataSelected.push(value);
                                }
                            });
                        }

                        me.load();
                        me.clearPreventStatePage();
                        Resinplast.Indicadores.Web.Components.Storage.Set(me.idGridStorage, me.getCurrentStatePage())
                        if (me.onPageChange) {
                            me.onPageChange();
                        }
                    },

                    isServerPaging: this.isServerPaging
                });
        }
    },

    createFooter: function () {
        var idPager = this.divGrid.attr('id') + 'Pager';
        if ($('#' + idPager).length > 0) {
            $('#' + idPager).remove();
        }

        this.divFooter = $('<div />');
        this.divFooter.attr('id', idPager);
        this.divFooter.css('width', this.width);
        if (this.indicatorGridInPopup) {
            this.divFooter.css('padding-bottom', '50px');
        }
        this.divGrid.after(this.divFooter);
    },

    createExportExcel: function () {
        if (this.showExportarExcel) {
            if (!this.divFooter) {
                this.createFooter();
            }

            var btnExport = null;
            var htmlExport = '<button type="button" class="btn btn-alt-success mr-5 mb-5" style="float:right"><i class="fa fa-download mr-5"></i>Excel</button>';

            if (this.isPager) {
                btnExport = $(htmlExport).appendTo(this.divFooter.find('div').first());
            } else {
                btnExport = $(htmlExport).appendTo(this.divFooter);
            }

            var me = this;
            btnExport.click(function () { me.exportGrid(); });
        }
    },

    exportGrid: function () {
        var data = this.getDataView().getItems();
        if (this.isServerPaging == true && data.length > 0) {
            this.exportServerPagination();
        }
        else {
            this.exportClientPagination();
            //this.exportServerPagination(); //VM en Prueba
        }
    },

    exportServerPagination: function () {
        var excelParam = {};
        excelParam.ExportarExcel = 'cookie' + Date.now();

        if (this.namePropertyData != null) {
            excelParam.NombrePropiedad = this.namePropertyData;
        }

        if (this.nameFileExcel != null) {
            excelParam.NombreArchivoExcel = this.nameFileExcel;
        }

        var currentAction = this.serverProxy.ajax.action;
        this.serverProxy.ajax.action += this.serverProxy.ajax.action.indexOf('?') != -1 ? '&' : '?';
        this.serverProxy.ajax.action += $.param(excelParam);

        //$.cookie.json = true;

        var definicion = this.getColumDefinition();
        //$.cookie(excelParam.ExportarExcel, definicion, { expires: 10, path: '/' });
        Cookies.set(excelParam.ExportarExcel, definicion, { expires: 10, path: '/' });

        this.load(true);
        this.serverProxy.ajax.action = currentAction;
    },

    exportClientPagination: function () {
        var definicion = this.getColumDefinition();

        var data = this.getDataView().getItems();
        var rows = new Array();
        var header = new Array();

        $.each(data, function (index, value) {
            var cells = new Array();
            for (var key in definicion) {
                var stringValue = null;

                switch (true) {
                    case (key.toUpperCase().indexOf('FECHAJULIANA') != -1):
                        stringValue = value[key] ? (value[key] === true ? '✔' : (value[key] === false ? '' : value[key])) : '';
                        break;

                    case (key.toUpperCase().indexOf('FECHA') != -1):
                        stringValue = value[key] ? moment(value[key]).format(Resinplast.Indicadores.Web.Global.Format.DateTimeGrid) : "";
                        if (stringValue.indexOf('00:00:00') != -1) {
                            stringValue = value[key] ? moment(value[key]).format(Resinplast.Indicadores.Web.Global.Format.DateGrid) : "";
                        }
                        break;

                    case (key.toUpperCase().indexOf('HORA') != -1):
                        stringValue = value[key] ? moment(value[key]).format(Resinplast.Indicadores.Web.Global.Format.HourGrid) : "";
                        break;

                    default:
                        //stringValue = value[key] ? (value[key] === true ? '✔' : (value[key] === false ? '' : value[key])) : '';
                        stringValue = value[key];
                        break;
                }

                cells.push(stringValue);
            }

            rows.push(cells);
        });

        for (var key in definicion) {
            header.push(definicion[key] ? definicion[key] : '');
        }

        this.setServerProxy({
            action: Resinplast.Indicadores.Web.General.DescargaArchivo.Actions.ExportarGrid,
            data: {
                listData: rows,
                listHeading: header,
                nombreSesion: 'ckresinplastExport' + Date.now(),
                nombreArchivo: this.nameFileExcel
            }
        });

        this.serverProxy.ajax.submit(this);
    },

    getColumDefinition: function () {
        var definition = {};

        $.each(this.columns, function (index, data) {
            var nameValid = (data.name && data.name != null && data.name.trim() != '' && data.name.indexOf('<input') == -1);
            var fieldValid = (data.field && data.field != null && data.field.trim() != '' && data.field.indexOf('<input') == -1);
            if (nameValid && fieldValid) {
                definition[data.field] = data.name;
            }
        });

        return definition;
    },

    formatGrid: function () {
        this.divGrid.css('background-color', 'white');
        this.divGrid.css('margin-bottom', '10px');

        if (this.width != null) {
            this.divGrid.css('width', this.width);
        } else {
            this.divGrid.css('width', this.defaultWidth);
        }

        if (this.height != null) {
            this.autoHeight = false;
            this.divGrid.height(this.height);
        } else {
            if (this.autoHeight == false) {
                this.divGrid.height(this.defaultHeight);
            }
        }
    },

    registerPlugin: function () {
        if (this.isCheckboxSelector || this.isRadioButtonSelector) {
            this.slickGrid.registerPlugin(this.checkboxSelector);
        }

        if (this.groupItemMetadataProvider != null) {
            this.slickGrid.registerPlugin(this.groupItemMetadataProvider);
        }

        this.slickGrid.registerPlugin(new Slick.AutoColumnSize());
    },

    setAutoColumnSize: function () {
        var oAutoColumnSize = new Slick.AutoColumnSize();
        oAutoColumnSize.init(this.slickGrid);
        oAutoColumnSize.resizeAllColumns();
    },

    clearData: function () {
        var dataNull = { ErrorCode: 0, ErrorDescription: "", ListData: new Array() };
        this.setData(dataNull);
    },

    setData: function (registros) {
        if ((registros.ErrorCode != null) && (registros.ErrorCode != 0)) {
            this.slickGrid.getCanvas().html('<div style="text-align:left;font-style:italic;padding-left:10px">' + registros.ErrorCode + ' - ' + registros.ErrorDescription + '</div>');
        }
        else {
            registros = registros.ListData;
            var data = new Array();
            $.each(registros, function (index, value) {
                var newValue = jQuery.extend({}, value);
                newValue.id = index;
                data.push(newValue);
            });

            this.slickGrid.getData().beginUpdate();
            this.slickGrid.getData().setItems(data);
            this.slickGrid.getData().endUpdate();

            if (this.isServerPaging == true) {
                this.slickGrid.invalidate();
            }

            if (this.isPager == true && this.isServerPaging != true) {
                this.pager.updateSizePage();
            }

            if (data.length == 0) {
                this.defaultHeight = -1;
                this.slickGrid.getCanvas().html('<div style="text-align:left;font-style:italic;padding-left:10px">' + Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaResultadosBusquedaVacia + '</div>');
            }

            this.configureAutoHeight();
            this.identity = data.length;

            if (this.forceFitColumns) {
                this.setAutoColumnSize();
            }

            this.implementsSort();//Ordenamiento
            this.implementsToolTip();
        }
    },

    setDataList: function (registros) {
        var data = new Array();
        $.each(registros, function (index, value) {
            var newValue = jQuery.extend({}, value);
            newValue.id = index;
            data.push(newValue);
        });

        this.slickGrid.getData().beginUpdate();
        this.slickGrid.getData().setItems(data);
        this.slickGrid.getData().endUpdate();

        if (this.isServerPaging == true) {
            this.slickGrid.invalidate();
        }

        if (this.isPager == true && this.isServerPaging != true) {
            this.pager.updateSizePage();
        }

        if (data.length == 0) {
            this.defaultHeight = -1;
            this.slickGrid.getCanvas().html('<div style="text-align:left;font-style:italic;padding-left:10px">' + Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaResultadosBusquedaVacia + '</div>');
        }

        this.configureAutoHeight();
        this.identity = data.length;

        if (this.forceFitColumns) {
            this.setAutoColumnSize();
        }

        this.implementsToolTip();
    },

    configureAutoHeight: function () {
        var countHeight = this.getDataView().getItems().length * this.getView().getOptions().rowHeight;
        if (this.autoHeight == true) {
            if (countHeight < this.defaultHeight) {
                this.divGrid.height(this.defaultHeight + 2);
                this.slickGrid.setOptions({
                    autoHeight: false
                });

                this.slickGrid.resizeCanvas();
            }
            else {
                this.slickGrid.setOptions({
                    autoHeight: true
                });

                this.divGrid.css('height', 'auto');
                this.slickGrid.getViewportSelector().css('height', 'auto');
                this.slickGrid.resizeCanvas();
            }
        }
    },

    setFilter: function (filter) {
        this.dataView.setFilter(filter);
    },

    addItem: function (item) {
        this.slickGrid.getData().beginUpdate();
        this.slickGrid.getData().addItem(item);
        //this.slickGrid.setSelectedRows([]);
        this.slickGrid.getData().endUpdate();
    },

    getSelectionData: function () {
        var selectedIndexes = this.slickGrid.getSelectedRows();
        var selectedData = new Array();
        var me = this;

        $.each(selectedIndexes, function (index, value) {
            var objeto = me.slickGrid.getData().getItemById(value);
            //var objeto = me.slickGrid.getData().getItem(value);
            selectedData.push(objeto);
        });

        $.each(me.tempDataSelected, function (index, value) {
            var valido = true;
            $.each(selectedData, function (indexT, temp) {
                if (value.RowId == temp.RowId) {
                    valido = false;
                    return valido;
                }
            });

            if (valido) {
                selectedData.push(value);
            }
        });

        return selectedData;
    },

    getSelectionDataFilter: function () {
        var selectedIndexes = this.slickGrid.getSelectedRows();
        var selectedData = new Array();
        var me = this;

        $.each(selectedIndexes, function (index, value) {
            //var objeto = me.slickGrid.getData().getItemById(value);
            var objeto = me.slickGrid.getData().getItem(value);
            selectedData.push(objeto);
        });

        return selectedData;
    },

    getSelectedRows: function () {
        return this.slickGrid.getSelectedRows();
    },

    setSelectedRows: function (arrayIndex) {
        this.slickGrid.setSelectedRows(arrayIndex);
    },

    setSelectedAll: function () {
        if (this.isServerPaging == true) {
            this.load(true);
        }

        var data = this.getDataView().getItems();
        var selectedData = new Array();
        $.each(data, function (index, value) {
            selectedData.push(value.id);
        });
        this.slickGrid.setSelectedRows(selectedData);
    },

    setServerProxy: function (proxy) {
        if (proxy) {
            if (this.serverProxy == null) {
                this.serverProxy = {
                    ajax: new Resinplast.Indicadores.Web.Components.Ajax({
                        autoSubmit: false,
                        onSuccess: function (data, scope) {
                            if (data && data.EsExportacionExcel) {
                                redirectPost(Resinplast.Indicadores.Web.General.DescargaArchivo.Actions.DescargarArchivo, { nombreSesion: data.NombreSesion });
                                return;
                            }

                            if (scope.onBeforeLoad) {
                                var dataTemp = scope.onBeforeLoad(data);
                                data = dataTemp ? dataTemp : data;
                            }

                            if (scope.isGetAll) {
                                scope.isGetAll = false;
                                scope.tempDataSelected = data;

                                if (scope.onToggleCheckboxRowSelection && scope.onToggleCheckboxRowSelection != null) {
                                    scope.onToggleCheckboxRowSelection(scope.tempDataSelected, true);
                                }
                            }
                            else {
                                /*Solo cuando no es*/
                                scope.setData(data);

                                //if (scope.isPager.isServerPaging) {
                                //    scope.isPager.processData(data);
                                //}

                                if (this.isPager) {
                                    if (scope.pager.isServerPaging) {
                                        scope.pager.processData(data);
                                    }
                                }

                                var data = scope.getDataView().getItems();
                                var selectedData = new Array();
                                $.each(data, function (index, value) {
                                    $.each(scope.tempDataSelected, function (indexT, temp) {
                                        if (value.RowId == temp.RowId) {
                                            selectedData.push(value.id);
                                            return false;
                                        }
                                    });
                                });

                                scope.slickGrid.setSelectedRows(selectedData);

                                if (scope.isCheckboxSelector && scope.checkboxSelector != null) {
                                    if (this.isPager) {
                                        var isSelectAll = scope.tempDataSelected.length == scope.getPageInfo().totalRows && scope.getPageInfo().totalRows > 0;
                                        scope.checkboxSelector.changeStateHeader(isSelectAll);
                                    }
                                }

                                if (scope.onLoad) {
                                    scope.onLoad(data);
                                }
                            }
                        }
                    }),
                    params: null
                };
            }

            this.serverProxy.ajax.action = proxy.action ? proxy.action : this.serverProxy.ajax.action;
            this.serverProxy.params = proxy.data ? proxy.data : this.serverProxy.params;
            this.serverProxy.ajax.data = this.serverProxy.params;
        }
    },

    load: function (getAll, opts) {
        if (this.serverProxy != null) {
            this.isGetAll = getAll != undefined ? getAll : false;

            if (this.isPager) {
                if (this.pager.isServerPaging) {
                    var pageInfo = this.getPageInfo();
                    this.serverProxy.params.PageSize = getAll ? (pageInfo.totalRows * 1.2) : this.pager.serverPageInfo.pageSize;
                    this.serverProxy.params.PageNo = getAll ? 1 : this.pager.serverPageInfo.pageNum + 1;
                }
            }

            this.serverProxy.ajax.data = this.serverProxy.params;
            this.serverProxy.ajax.submit(this, opts);
        }
    },

    getPageInfo: function () {
        var pageInfo = null;
        if (this.pager && this.pager != null) {
            if (this.pager.isServerPaging) {
                pageInfo = this.pager.serverPageInfo;
            }
            else {
                pageInfo = this.dataView.getPagingInfo();
            }
        }
        return pageInfo;
    },

    getCurrentStatePage: function () {
        var pageInfo = this.getPageInfo();
        var currentPage = null;
        if (pageInfo && pageInfo != null) {
            currentPage = { PageSize: pageInfo.pageSize, Page: (pageInfo.pageNum + 1) };
        }
        return currentPage;
    },

    setCurrentStatePage: function (pageNo, pageSize) {
        var pageInfo = this.getPageInfo();
        if (pageInfo && pageInfo != null) {
            pageInfo.pageNum = pageNo - 1;
            pageInfo.pageSize = pageSize;
        }
    },

    loadCurrentStatePage: function () {
        var currentState = Resinplast.Indicadores.Web.Components.Storage.Get(this.idGridStorage);
        if (currentState && currentState != null) {
            this.setCurrentStatePage(currentState.Page, currentState.PageSize);
        }
    },

    clearPreventStatePage: function () {
        Resinplast.Indicadores.Web.Global.Grid.Options.PreventPageState = null;
    },

    destroy: function () {
        this.slickGrid.destroy();
    },

    closeToolTip: function () {
        this.divGrid.tooltip('destroy');
    }
}
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
ns('Resinplast.Indicadores.Web.Components.Storage');
Resinplast.Indicadores.Web.Components.Storage = {
    Exists: function (name) {
        var item = sessionStorage.getItem(name);
        return (item != null);
    },
    Get: function (name) {
        return JSON.parse(sessionStorage.getItem(name));
    },
    Set: function (name, value, days) {
        sessionStorage.setItem(name, JSON.stringify(value))
    },
    Remove: function (name) {
        sessionStorage.removeItem(name);
    }
}
ns('Resinplast.Indicadores.Web.Components.Validator');
Resinplast.Indicadores.Web.Components.Validator = function (opts) {
    this.init(opts);
};

Resinplast.Indicadores.Web.Components.Validator.prototype = {
    form: null,
    messages: null,
    validator: null,
    init: function (opts) {
        if (opts) {
            this.form = opts.form ? $('#' + opts.form) : null;
            this.messages = opts.messages ? opts.messages : null;

            if (this.form != null) {
                this.validator = this.form.validate();

                var localLanguage = Resinplast.Indicadores.Web.Global.Format.Language.toLowerCase();
                if (typeof localLanguage !== 'undefined') {
                    $.extend($.validator.messages, $.validator.messages[localLanguage]);
                }

                //this.validator.settings.success = 'valid';
                this.validator.settings.errorClass = 'invalid-feedback animated fadeInDown';
                this.validator.settings.errorElement = 'div';

                this.validator.settings.errorPlacement = function (error, element) {
                    $(element).parents('.form-group > div').append(error);
                };

                this.validator.settings.highlight = function (element) {
                    $(element).closest('.form-group > div').addClass('is-invalid');
                };

                this.validator.settings.unhighlight = function (element) {
                    $(element).closest('.form-group > div').removeClass('is-invalid');
                };

                this.validator.settings.success = function (element) {
                    $(element).closest('.form-group').removeClass('is-invalid');
                    $(element).remove();
                };

                this.configure();
            }
        }
    },

    configure: function () {
        var base = this;
        var rules = {};
        var messages = {};

        base.form.find('[validable]').each(function () {
            var nameControl = $(this).attr('name');

            if (nameControl == undefined) {
                var id = $(this).attr('id');
                $(this).attr('name', id);
                nameControl = $(this).attr('name');
            }

            var message = Resinplast.Indicadores.Web.Shared.Message.Resources.ValidacionDebeIngresar + ' ';
            var newMessage = message ? message : "Por favor, debe ingresar ";

            var settingsControl = {};
            var settingsMessage = {};
            var validations = $(this).attr('validable').split(',');

            for (var i = 0; i < validations.length; i++) {
                var attributes = $.trim(validations[i]).split(' ');
                var typeValidation = $.trim(attributes[0]);
                var newValue = (typeValidation == 'required');
                var value = $.trim(attributes[1]);
                var codeMessage;

                if (value == 'true') {
                    var newValue = true;
                } else if (value == 'false') {
                    var newValue = false;
                } else if ($.isNumeric(value)) {
                    var newValue = parseFloat(value);
                } else {
                    codeMessage = value;
                }

                if (attributes.length > 2) {
                    codeMessage = $.trim(attributes[2]);
                }

                settingsControl[typeValidation] = newValue;
                settingsMessage[typeValidation] = newMessage + base.messages[codeMessage];
            }

            rules[nameControl] = settingsControl;
            messages[nameControl] = settingsMessage;
        });

        base.validator.settings.rules = rules;
        base.validator.settings.messages = messages;
    },

    isValid: function () {
        var valid = true;

        this.validator.form();
        valid = this.validator.valid();

        if (!valid) {
            this.validator.focusInvalid();
        }

        return valid;
    },

    reset: function () {
        this.validator.resetForm();
        this.validator.reset();
    }
}