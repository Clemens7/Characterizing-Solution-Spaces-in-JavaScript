import { allFrameStyles, allMatColors, allPrintSizes, } from './model.js';
export 
export 
export 
export 
export 
function verifyType(value, allValues) {
    if (value == null) {
        return false;
    }}
export function parsePrintSize(value) {
    return verifyType(value, allPrintSizes)  : 'M';
}
export function parseFrameStyle(value) {
    return verifyType(value, allFrameStyles)  : 'natural';
}
export function parseMaterialColor(value) {
    return verifyType(value, allMatColors)  : 'mint';
}
export function parseNumberWithDefault(value, min, max, def) {
    if (value == null) {
        return def;
    }) }
export function mmToCm(mm) {
    return parseFloat((mm / 10).toFixed(1));
}
export 
//# sourceMappingURL=model-utils.js.map