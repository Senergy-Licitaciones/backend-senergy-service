"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unidad = exports.Parametro = exports.RoleAdmin = exports.Estado = exports.Type = exports.Role = void 0;
var Role;
(function (Role) {
    Role["Basico"] = "basico";
    Role["Premium"] = "premium";
})(Role = exports.Role || (exports.Role = {}));
var Type;
(function (Type) {
    Type["User"] = "user";
    Type["Proveedor"] = "proveedor";
    Type["Admin"] = "admin";
})(Type = exports.Type || (exports.Type = {}));
var Estado;
(function (Estado) {
    Estado["Online"] = "online";
    Estado["Offline"] = "offline";
    Estado["ToConfirm"] = "toConfirm";
})(Estado = exports.Estado || (exports.Estado = {}));
var RoleAdmin;
(function (RoleAdmin) {
    RoleAdmin["Employee"] = "empleado";
    RoleAdmin["Boss"] = "jefe";
})(RoleAdmin = exports.RoleAdmin || (exports.RoleAdmin = {}));
var Parametro;
(function (Parametro) {
    Parametro["PG"] = "Precio del Gas Natural en boca de pozo";
    Parametro["PGN"] = "Precio del Gas Natural publicado por OSINERGMIN";
    Parametro["PPI"] = "\u00CDndice de Precios al Productor de los Estados Unidos";
    Parametro["PR6"] = "Precio del Residual R6 en la Planta Callao";
    Parametro["PR500"] = "Precio del Petr\u00F3leo Residual R500";
    Parametro["PC"] = "Precio de referencia de importaci\u00F3n del Carb\u00F3n bituminoso";
})(Parametro = exports.Parametro || (exports.Parametro = {}));
var Unidad;
(function (Unidad) {
    Unidad["Dolar"] = "US$/MMBTU";
})(Unidad = exports.Unidad || (exports.Unidad = {}));
