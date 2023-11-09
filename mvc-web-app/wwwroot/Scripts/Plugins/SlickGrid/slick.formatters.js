/***
 * Contains basic SlickGrid formatters.
 * 
 * NOTE:  These are merely examples.  You will most likely need to implement something more
 *        robust/extensible/localizable/etc. for your use!
 * 
 * @module Formatters
 * @namespace Slick
 */

(function ($) {
    // register namespace
    $.extend(true, window, {
        "Slick": {
            "Formatters": {
                "PercentComplete": PercentCompleteFormatter,
                "PercentCompleteBar": PercentCompleteBarFormatter,
                "YesNo": YesNoFormatter,
                "Checkmark": CheckmarkFormatter,
                "Checkbox": CheckboxFormatter,
                "Date": DateFormatter,
                "DateTime": DateTimeFormatter,
                "HourTime": HourTimeFormatter,
                "FlagIndicator": FlagIndicatorFormatter
            }
        }
    });

    function PercentCompleteFormatter(row, cell, value, columnDef, dataContext) {
        if (value == null || value === "") {
            return "-";
        } else if (value < 50) {
            return "<span style='color:red;font-weight:bold;'>" + value + "%</span>";
        } else {
            return "<span style='color:green'>" + value + "%</span>";
        }
    }

    function PercentCompleteBarFormatter(row, cell, value, columnDef, dataContext) {
        if (value == null || value === "") {
            return "";
        }

        var color;

        if (value < 30) {
            color = "red";
        } else if (value < 70) {
            color = "silver";
        } else {
            color = "green";
        }

        return "<span class='percent-complete-bar' style='background:" + color + ";width:" + value + "%'></span>";
    }

    function YesNoFormatter(row, cell, value, columnDef, dataContext) {
        return value ? "Yes" : "No";
    }

    function CheckboxFormatter(row, cell, value, columnDef, dataContext) {
        return '<img class="slick-edit-preclick" src="../images/' + (value ? "CheckboxY" : "CheckboxN") + '.png">';
    }

    function CheckmarkFormatter(row, cell, value, columnDef, dataContext) {
        return value ? "<img src='../images/tick.png'>" : "";
    }

    function DateFormatter(row, cell, value, columnDef, dataContext) {
        return value ? moment(value).format(Resinplast.Indicadores.Web.Global.Format.Date.toUpperCase()) : "";
    }

    function DateTimeFormatter(row, cell, value, columnDef, dataContext) {
        return value ? moment(value).format(Resinplast.Indicadores.Web.Global.Format.DateTimeGrid) : "";
    }

    function HourTimeFormatter(row, cell, value, columnDef, dataContext) {
        return value ? moment(value).format(Resinplast.Indicadores.Web.Global.Format.HourGrid) : "";
    }

    function FlagIndicatorFormatter(row, cell, value, columnDef, dataContext) {
        var cadena = '<i class="fa fa-square-o fa-lg"></i>';

        if (value == "1") {
            cadena = '<i class="fa fa-check-square-o fa-lg"></i>';
        }

        return cadena;
    }
})(jQuery);