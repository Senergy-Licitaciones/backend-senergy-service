"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularHistoricoEnergiaHfp = exports.calcularHistoricoEnergiaHp = exports.calcularHistorico = void 0;
const calcularHistorico = (historicoParametros, bloquesMeses, oferta) => {
    return bloquesMeses.flat().map((mes) => {
        let founded = false;
        const potenciaBase = bloquesMeses.reduce((prev, curre, j) => {
            if (founded)
                return prev;
            const value = curre.filter((el) => el === mes);
            if (value.length !== 0) {
                founded = true;
                return oferta.potencia[j].potencia;
            }
            return oferta.potencia[j].potencia;
        }, oferta.potencia[0].potencia);
        const factor = oferta.formulaIndexPotencia.reduce((prev, current) => {
            var _a, _b;
            const parametro = historicoParametros.find((parametro) => parametro._id.toString() === current.indexId.toString());
            if (parametro == null)
                return prev;
            const valueParametroActual = (_a = parametro.values.find((el) => el.fecha === mes)) === null || _a === void 0 ? void 0 : _a.value;
            if (valueParametroActual == null)
                return prev;
            const mesOferta = (oferta.createdAt.getMonth() + 1).toString() + '-' + oferta.createdAt.getFullYear().toString();
            const parametroBase = (_b = parametro.values.find((el) => el.fecha === mesOferta)) === null || _b === void 0 ? void 0 : _b.value;
            if (parametroBase == null)
                return prev;
            const result = current.factor * valueParametroActual / parametroBase + prev;
            return result;
        }, 0);
        return {
            fecha: mes,
            value: potenciaBase * factor
        };
    });
};
exports.calcularHistorico = calcularHistorico;
const calcularHistoricoEnergiaHp = (margenEnergia, historicoParametros, bloquesMeses, oferta) => {
    return bloquesMeses.flat().map((mes) => {
        let founded = false;
        const energiaBase = bloquesMeses.reduce((prev, curre, j) => {
            if (founded)
                return prev;
            const value = curre.filter((el) => el === mes);
            if (value.length !== 0) {
                founded = true;
                return oferta.energiaHp[j].energia;
            }
            return oferta.energiaHp[j].energia;
        }, oferta.energiaHp[0].energia);
        const factor = oferta.formulaIndexEnergia.reduce((prev, current) => {
            var _a, _b;
            const parametro = historicoParametros.find((parametro) => parametro._id.toString() === current.indexId.toString());
            if (parametro == null)
                return prev;
            const valueParametroActual = (_a = parametro.values.find((el) => el.fecha === mes)) === null || _a === void 0 ? void 0 : _a.value;
            if (valueParametroActual == null)
                return prev;
            const mesOferta = (oferta.createdAt.getMonth() + 1).toString() + '-' + oferta.createdAt.getFullYear().toString();
            const parametroBase = (_b = parametro.values.find((el) => el.fecha === mesOferta)) === null || _b === void 0 ? void 0 : _b.value;
            if (parametroBase == null)
                return prev;
            const result = current.factor * valueParametroActual / parametroBase + prev;
            return result;
        }, 0);
        return {
            fecha: mes,
            value: energiaBase * factor + margenEnergia
        };
    });
};
exports.calcularHistoricoEnergiaHp = calcularHistoricoEnergiaHp;
const calcularHistoricoEnergiaHfp = (margenEnergia, historicoParametros, bloquesMeses, oferta) => {
    return bloquesMeses.flat().map((mes) => {
        let founded = false;
        const energiaBase = bloquesMeses.reduce((prev, curre, j) => {
            if (founded)
                return prev;
            const value = curre.filter((el) => el === mes);
            if (value.length !== 0) {
                founded = true;
                return oferta.energiaHfp[j].energia;
            }
            return oferta.energiaHfp[j].energia;
        }, oferta.energiaHfp[0].energia);
        const factor = oferta.formulaIndexEnergia.reduce((prev, current) => {
            var _a, _b;
            const parametro = historicoParametros.find((parametro) => parametro._id.toString() === current.indexId.toString());
            if (parametro == null)
                return prev;
            const valueParametroActual = (_a = parametro.values.find((el) => el.fecha === mes)) === null || _a === void 0 ? void 0 : _a.value;
            if (valueParametroActual == null)
                return prev;
            const mesOferta = (oferta.createdAt.getMonth() + 1).toString() + '-' + oferta.createdAt.getFullYear().toString();
            const parametroBase = (_b = parametro.values.find((el) => el.fecha === mesOferta)) === null || _b === void 0 ? void 0 : _b.value;
            if (parametroBase == null)
                return prev;
            const result = current.factor * valueParametroActual / parametroBase + prev;
            return result;
        }, 0);
        return {
            fecha: mes,
            value: energiaBase * factor + margenEnergia
        };
    });
};
exports.calcularHistoricoEnergiaHfp = calcularHistoricoEnergiaHfp;
