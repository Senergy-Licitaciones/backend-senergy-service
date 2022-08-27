"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTarifasArrayAdapter = void 0;
const createTarifasArrayAdapter = (jsons) => {
    const data = jsons.map((json, i) => {
        if (i === 0) {
            return {
                name: '',
                values: []
            };
        }
        const values = [];
        for (const key in json) {
            if (key !== 'Meses') {
                values.push({
                    fecha: key,
                    value: json[key]
                });
            }
        }
        return {
            name: json.Meses,
            values
        };
    });
    data.shift();
    return data;
};
exports.createTarifasArrayAdapter = createTarifasArrayAdapter;
