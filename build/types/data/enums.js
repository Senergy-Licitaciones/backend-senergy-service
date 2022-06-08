"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estado = exports.Type = exports.Role = void 0;
var Role;
(function (Role) {
    Role["Basico"] = "basico";
    Role["Premium"] = "premium";
    Role["Admin"] = "admin";
})(Role = exports.Role || (exports.Role = {}));
var Type;
(function (Type) {
    Type["User"] = "user";
    Type["Proveedor"] = "proveedor";
})(Type = exports.Type || (exports.Type = {}));
var Estado;
(function (Estado) {
    Estado["Online"] = "online";
    Estado["Offline"] = "offline";
    Estado["ToConfirm"] = "toConfirm";
})(Estado = exports.Estado || (exports.Estado = {}));
