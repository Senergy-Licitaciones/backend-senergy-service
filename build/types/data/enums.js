"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleAdmin = exports.Estado = exports.Type = exports.Role = void 0;
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
    RoleAdmin["Employee"] = "Empleado";
    RoleAdmin["Boss"] = "Jefe";
})(RoleAdmin = exports.RoleAdmin || (exports.RoleAdmin = {}));
