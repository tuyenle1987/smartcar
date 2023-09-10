"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = exports.parseData = void 0;
const parseData = (type, value) => {
    console.log(type, value);
    if (type === 'String') {
        return String(value);
    }
    if (type === 'Boolean') {
        return Boolean(value);
    }
    if (type === 'Number') {
        return parseFloat(value);
    }
    return null;
};
exports.parseData = parseData;
const getData = (name, data) => {
    return (0, exports.parseData)(data[name]?.type, data[name]?.value);
};
exports.getData = getData;
//# sourceMappingURL=dataUtil.js.map