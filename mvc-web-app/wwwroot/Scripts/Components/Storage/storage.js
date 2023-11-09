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