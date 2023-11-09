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