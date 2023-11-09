(function ($) {
    function SlickGridPager(dataView, grid, $container, opts) {
        var $status;
        var serverPageInfo = {
            pageSize: parseInt(opts.defaultPageSize),
            pageNum: 0,
            totalPages: 1,
            totalRows: 0
        };
        var serverProxy = null;

        function init() {
            if (!opts.isServerPaging) {
                dataView.setPagingOptions({
                    pageSize: opts.defaultPageSize,
                });
                dataView.onPagingInfoChanged.subscribe(function (e, pagingInfo) {
                    updatePager(pagingInfo);
                });
            }
            constructPagerUI();
            //updatePager(dataView.getPagingInfo());
            ////VM(Se modifico la actualización deacuerdo a la forma de paginación)
            updatePager(opts.isServerPaging ? serverPageInfo : dataView.getPagingInfo());
        }

        function getNavState() {
            var cannotLeaveEditMode = !Slick.GlobalEditorLock.commitCurrentEdit();
            var pagingInfo = opts.isServerPaging ? serverPageInfo : dataView.getPagingInfo();
            var lastPage = pagingInfo.totalPages - 1;

            if (lastPage == -1) {
                lastPage = 0;
            }

            return {
                canGotoFirst: !cannotLeaveEditMode && pagingInfo.pageSize != 0 && pagingInfo.pageNum > 0,
                canGotoLast: !cannotLeaveEditMode && pagingInfo.pageSize != 0 && pagingInfo.pageNum != lastPage,
                canGotoPrev: !cannotLeaveEditMode && pagingInfo.pageSize != 0 && pagingInfo.pageNum > 0,
                canGotoNext: !cannotLeaveEditMode && pagingInfo.pageSize != 0 && pagingInfo.pageNum < lastPage,
                pagingInfo: pagingInfo
            }
        }

        function processData(data) {
            if (data.myData != null) {
                data = data.myData;
            }
            else {
                data = [];
            }

            var totalRows = 0;
            if (data != null && data.length > 0 && data[0].RowsTotal) {
                totalRows = data[0].RowsTotal;
            }

            data = data.splice(serverPageInfo.pageSize);
            setTotalServerRows(totalRows);
            updatePager(serverPageInfo);
            return data;
        }

        function setTotalServerRows(totalRows) {
            serverPageInfo.totalRows = totalRows;
            serverPageInfo.totalPages = Math.ceil(serverPageInfo.totalRows / serverPageInfo.pageSize);
        }

        function setPageSize(n) {
            if (opts.isServerPaging) {
                serverPageInfo.pageSize = n;
                serverPageInfo.totalPages = Math.ceil(serverPageInfo.totalRows / serverPageInfo.pageSize);
                serverPageInfo.pageNum = 0;
                if (opts.onPageChange) {
                    opts.onPageChange(serverPageInfo);
                }
            }
            else {
                dataView.setRefreshHints({
                    isFilterUnchanged: true
                });
                dataView.setPagingOptions({ pageSize: n });
            }
        }

        function gotoFirst() {
            if (getNavState().canGotoFirst) {
                if (opts.isServerPaging) {
                    serverPageInfo.pageNum = 0;
                    if (opts.onPageChange) {
                        opts.onPageChange(serverPageInfo);
                    }
                }
                else {
                    dataView.setPagingOptions({ pageNum: 0 });
                }
            }
        }

        function gotoLast() {
            var state = getNavState();
            if (state.canGotoLast) {
                if (opts.isServerPaging) {
                    serverPageInfo.pageNum = serverPageInfo.totalPages - 1;
                    if (opts.onPageChange) {
                        opts.onPageChange(serverPageInfo);
                    }
                }
                else {
                    dataView.setPagingOptions({ pageNum: state.pagingInfo.totalPages - 1 });
                }
            }
        }

        function gotoPrev() {
            var state = getNavState();
            if (state.canGotoPrev) {
                if (opts.isServerPaging) {
                    serverPageInfo.pageNum = serverPageInfo.pageNum - 1;
                    if (opts.onPageChange) {
                        opts.onPageChange(serverPageInfo);
                    }
                }
                else {
                    dataView.setPagingOptions({ pageNum: state.pagingInfo.pageNum - 1 });
                }
            }
        }

        function gotoNext() {
            var state = getNavState();
            if (state.canGotoNext) {
                if (opts.isServerPaging) {
                    serverPageInfo.pageNum = serverPageInfo.pageNum + 1;
                    if (opts.onPageChange) {
                        opts.onPageChange(serverPageInfo);
                    }
                }
                else {
                    dataView.setPagingOptions({ pageNum: state.pagingInfo.pageNum + 1 });
                }
            }
        }

        function constructPagerUI() {
            $container.empty();

            //var pageAuto = $container.attr('pageauto'); //VM: Se modifico el valor por defect segun el pagesize enviado
            var pageAuto = opts.defaultPageSize;

            var $nav = $("<span class='slick-pager-nav' />").appendTo($container);
            var $settings = $("<span class='slick-pager-settings' />").appendTo($container);
            $status = $("<span class='slick-pager-status' />").appendTo($container);

            $settings
                .append("<div class='pull-right'><div class='form-inline form-search' role='form'><div class='form-group' style='padding-right: 10px'><label for='numero-order'>" + Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaFilasPorPagina + ":</label></div><div class='form-group'><select class='form-control'><option>Auto</option><option>10</option><option>25</option><option>50</option><option>100</option></select></div></div></div>");

            //$settings.find("a[data]").click(function (e) {
            //    var pagesize = $(e.target).attr("data");
            //    if (pagesize != undefined) {
            //        if (pagesize == -1) {
            //            var vp = grid.getViewport();
            //            setPageSize(vp.bottom - vp.top);
            //        } else {
            //            setPageSize(parseInt(pagesize));
            //        }
            //    }
            //});

            $settings.find("select").on('change', updateSizePage);

            var icon_prefix = "<span class='ui-state-default ui-corner-all ui-icon-container'><span class='ui-icon ";
            var icon_suffix = "' /></span>";

            $(icon_prefix + "ui-icon-lightbulb" + icon_suffix)
                .click(function () {
                    $(".slick-pager-settings-expanded").toggle()
                })
                //.appendTo($settings);

            $(icon_prefix + "ui-icon-seek-first" + icon_suffix)
                .click(gotoFirst)
                .appendTo($nav);

            $(icon_prefix + "ui-icon-seek-prev" + icon_suffix)
                .click(gotoPrev)
                .appendTo($nav);

            $(icon_prefix + "ui-icon-seek-next" + icon_suffix)
                .click(gotoNext)
                .appendTo($nav);

            $(icon_prefix + "ui-icon-seek-end" + icon_suffix)
                .click(gotoLast)
                .appendTo($nav);

            $container.find(".ui-icon-container")
                .hover(function () {
                    $(this).toggleClass("ui-state-hover");
                });

            $container.children().wrapAll("<div class='slick-pager' />");
        }

        function updateSizePage() {  //JS              
            var pagesize = this.value;
            if (pagesize == 'Auto' || pagesize == undefined) {
                pagesize = opts.defaultPageSize;
            }

            if (pagesize != undefined) {
                if (pagesize == -1) {
                    var vp = grid.getViewport();
                    setPageSize(vp.bottom - vp.top);
                } else {
                    setPageSize(parseInt(pagesize));
                }
            }
        }

        function updatePager(pagingInfo) {
            var state = getNavState();

            var totalRowsCount = 0;
            var totalPages = 1;
            var pageSize = 0;

            if (dataView.getItems().length > 0) {
                totalRowsCount = opts.isServerPaging ? pagingInfo.totalRows : dataView.getItems().length;
                totalPages = pagingInfo.totalPages;
                pageSize = pagingInfo.pageSize;
            }

            //var visibleRowsCount = grid.isServerPaging ? pagingInfo.pageSize/*calcular*/ : pagingInfo.totalRows;
            var totalRowsLabel = '';

            $container.find(".slick-pager-nav span").removeClass("ui-state-disabled");
            if (!state.canGotoFirst) {
                $container.find(".ui-icon-seek-first").addClass("ui-state-disabled");
            }

            if (!state.canGotoLast) {
                $container.find(".ui-icon-seek-end").addClass("ui-state-disabled");
            }

            if (!state.canGotoNext) {
                $container.find(".ui-icon-seek-next").addClass("ui-state-disabled");
            }

            if (!state.canGotoPrev) {
                $container.find(".ui-icon-seek-prev").addClass("ui-state-disabled");
            }

            var ultimasFilas = pageSize;
            if ((pagingInfo.pageNum + 1).toString() == pagingInfo.totalPages.toString()) {
                ultimasFilas = totalRowsCount - (pagingInfo.pageNum * pageSize);
            }

            totalRowsLabel = ' ' + Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaFilas + ' ' + ultimasFilas + " / " + totalRowsCount;
            if (pagingInfo.pageSize == 0) {
                /*if (visibleRowsCount < totalRowsCount) {
                    //$status.text("Showing " + visibleRowsCount + " of " + totalRowsCount + " rows");
                    $status.text(" " + visibleRowsCount + " / " + totalRowsCount + " filas");
                } else {
                    //$status.text("Showing all " + totalRowsCount + " rows");
                    $status.text(totalRowsLabel);
                }*/
                //$status.text("Showing all " + pagingInfo.totalRows + " rows");
                //$status.text(" todo " + pagingInfo.totalRows + " filas");
                $status.text(totalRowsLabel);
            } else {
                //$status.text("Showing page " + (pagingInfo.pageNum + 1) + " of " + pagingInfo.totalPages);
                $status.text(Resinplast.Indicadores.Web.Shared.General.Resources.EtiquetaPagina + ' ' + (pagingInfo.pageNum + 1) + " / " + totalPages + ' | ' + totalRowsLabel);
            }
        }

        $.extend(this, {
            "isServerPaging": opts.isServerPaging ? opts.isServerPaging : false,
            "serverPageInfo": serverPageInfo,
            "processData": processData,
            "updateSizePage": updateSizePage
        });
        init();
    }

    // Slick.Controls.Pager
    $.extend(true, window, { Slick: { Controls: { Pager: SlickGridPager } } });
})(jQuery);