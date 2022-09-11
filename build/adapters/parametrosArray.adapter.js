"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParametrosProyeccionAdapter = exports.createParametrosArrayAdapter = void 0;
const createParametrosArrayAdapter = (jsons) => {
    const data = jsons.map((json, i) => {
        if (i === 0) {
            return {
                name: '',
                values: []
            };
        }
        const values = [];
        for (const key in json) {
            if (key !== 'Meses' && key !== 'Nombre') {
                values.push({
                    fecha: key,
                    value: json[key]
                });
            }
        }
        return {
            name: json.Nombre,
            values
        };
    });
    data.shift();
    return data;
};
exports.createParametrosArrayAdapter = createParametrosArrayAdapter;
const createParametrosProyeccionAdapter = (jsons) => {
    const data = jsons.map((json, i) => {
        if (i === 0) {
            return {
                _id: '',
                name: '',
                values: []
            };
        }
        const values = [];
        for (const key in json) {
            if (key !== 'Meses' && key !== 'Nombre') {
                values.push({
                    fecha: key,
                    value: json[key]
                });
            }
        }
        return {
            _id: json.Nombre,
            name: json.Meses,
            values
        };
    });
    return data;
};
exports.createParametrosProyeccionAdapter = createParametrosProyeccionAdapter;
