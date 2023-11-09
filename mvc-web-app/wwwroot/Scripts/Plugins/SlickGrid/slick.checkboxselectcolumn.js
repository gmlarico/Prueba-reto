(function ($) {
    // register namespace
    $.extend(true, window, {
        "Slick": {
            "CheckboxSelectColumn": CheckboxSelectColumn
        }
    });

    function CheckboxSelectColumn(options) {
        var _grid;
        var _self = this;
        var _handler = new Slick.EventHandler();
        var _selectedRowsLookup = {};
        var _defaults = {
            columnId: "_checkbox_selector",
            cssClass: null,
            toolTip: "Select/Deselect All",
            width: 30,
            showHeaderCheckBox: true
        };

        var htmlCheckboxSuccess = "<label class='css-control css-control-sm css-control-success css-checkbox'><input type='checkbox' class='css-control-input'><span class='css-control-indicator'></span></label>";
        var htmlCheckboxSuccessChecked = "<label class='css-control css-control-sm css-control-success css-checkbox'><input type='checkbox' class='css-control-input' checked='checked'><span class='css-control-indicator'></span></label>";

        var htmlCheckboxHeader = "<div style='padding-left: 5px'><label class='css-control css-control-primary css-checkbox'><input type='checkbox' class='css-control-input'><span class='css-control-indicator'></span></label></div>";
        var htmlCheckboxHeaderChecked = "<div style='padding-left: 5px'><label class='css-control css-control-primary css-checkbox'><input type='checkbox' class='css-control-input' checked='checked'><span class='css-control-indicator'></span></label></div>";

        var _options = $.extend(true, {}, _defaults, options);

        function init(grid) {
            _grid = grid;
            _handler
              .subscribe(_grid.onSelectedRowsChanged, handleSelectedRowsChanged)
              .subscribe(_grid.onClick, handleClick)
              .subscribe(_grid.onKeyDown, handleKeyDown);
            if (_options.showHeaderCheckBox) {
                _handler.subscribe(_grid.onHeaderClick, handleHeaderClick);
            }
        }

        function destroy() {
            _handler.unsubscribeAll();
        }

        function handleSelectedRowsChanged(e, args) {
            var selectedRows = _grid.getSelectedRows();
            var lookup = {}, row, i;
            for (i = 0; i < selectedRows.length; i++) {
                row = selectedRows[i];
                lookup[row] = true;
                if (lookup[row] !== _selectedRowsLookup[row]) {
                    _grid.invalidateRow(_grid.getData().getIdxById(row));
                    delete _selectedRowsLookup[row];
                }
            }

            for (i in _selectedRowsLookup) {
                _grid.invalidateRow(_grid.getData().getIdxById(i));
            }

            _selectedRowsLookup = lookup;
            _grid.render();

            //ActivarSeleccionTodos segun paginacion
            if (_options.showHeaderCheckBox) {
                var isSelectAll = selectedRows.length && selectedRows.length == _grid.getData().getItems().length;
                changeStateHeader(isSelectAll);
            }
        }

        function changeStateHeader(checked) {
            if (_options.showHeaderCheckBox) {
                if (checked) {
                    _grid.updateColumnHeader(_options.columnId, htmlCheckboxHeaderChecked, _options.toolTip);
                } else {
                    _grid.updateColumnHeader(_options.columnId, htmlCheckboxHeader, _options.toolTip);
                }
            }
        }

        function handleKeyDown(e, args) {
            if (e.which == 32) {
                if (_grid.getColumns()[args.cell].id === _options.columnId) {
                    // if editing, try to commit
                    if (!_grid.getEditorLock().isActive() || _grid.getEditorLock().commitCurrentEdit()) {
                        // Racalcular el row a seleccionar
                        var item = args.grid.getDataItem(args.row);
                        //toggleRowSelection(args.row);
                        toggleRowSelection(item.id);
                    }
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            }
        }

        function handleClick(e, args) {
            // clicking on a row select checkbox
            if (_grid.getColumns()[args.cell].id === _options.columnId && $(e.target).is(":checkbox")) {
                // if editing, try to commit
                if (_grid.getEditorLock().isActive() && !_grid.getEditorLock().commitCurrentEdit()) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return;
                }

                // Racalcular el row a seleccionar
                var item = args.grid.getDataItem(args.row);
                //toggleRowSelection(args.row);
                toggleRowSelection(item.id);
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }

        function toggleRowSelection(row) {
            //Quitar los que no estan
            var checked = true;
            if (_selectedRowsLookup[row]) {
                checked = false;
                _grid.setSelectedRows($.grep(_grid.getSelectedRows(), function (n) {
                    return n != row
                }));
            } else {
                _grid.setSelectedRows(_grid.getSelectedRows().concat(row));
            }

            if (_options.onToggleRowSelection) {
                _options.onToggleRowSelection(row, checked);
            }
        }

        function handleHeaderClick(e, args) {
            //Todos sleccionados
            if (args.column.id == _options.columnId && $(e.target).is(":checkbox")) {
                // if editing, try to commit
                if (_grid.getEditorLock().isActive() && !_grid.getEditorLock().commitCurrentEdit()) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return;
                }

                var rows = [];
                $.each(_grid.getData().getItems(), function (index, value) {
                    rows.push(value.id);
                });

                if ($(e.target).is(":checked")) {
                    /*for (var i = 0; i < _grid.getDataLength() ; i++) {
                        rows.push(i);
                    }*/
                    _grid.setSelectedRows(rows);
                    _options.onHeaderClick(true);
                } else {
                    _grid.setSelectedRows([]);
                    _options.onHeaderClick(false);
                }

                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }

        function getColumnDefinition() {
            return {
                id: _options.columnId,
                name: _options.showHeaderCheckBox ? htmlCheckboxSuccess : "",
                toolTip: _options.showHeaderCheckBox ? _options.toolTip : null,
                field: "sel",
                width: _options.width,
                resizable: false,
                sortable: false,
                cssClass: _options.cssClass,
                formatter: checkboxSelectionFormatter
            };
        }

        function checkboxSelectionFormatter(row, cell, value, columnDef, dataContext) {
            if (dataContext) {
                //return _selectedRowsLookup[dataContext.id]// _selectedRowsLookup[row]
                //    ? "<input type='checkbox' checked='checked'>"
                //    : "<input type='checkbox'>";
                return _selectedRowsLookup[dataContext.id] ? htmlCheckboxSuccessChecked : htmlCheckboxSuccess
            }
            return null;
        }

        $.extend(this, {
            "init": init,
            "destroy": destroy,
            'changeStateHeader': changeStateHeader,
            "getColumnDefinition": getColumnDefinition
        });
    }
})(jQuery);