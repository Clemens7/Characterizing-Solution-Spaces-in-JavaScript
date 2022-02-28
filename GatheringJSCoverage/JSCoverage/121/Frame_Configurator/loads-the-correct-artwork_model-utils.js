import { allFrameStyles, allMatColors, allPrintSizes, } from './model.js';
export function getPrintSizeDescription(printSize) {
    switch (printSize) {
        case 'S':
            return 'Small';
        case 'M':
            return 'Medium';
        case 'L':
            return 'Large';
    }
}
export function getFrameStyleDescription(frameStyle) {
    switch (frameStyle) {
        case 'classic':
            return 'Classic';
        case 'elegant':
            return 'Elegant';
        case 'natural':
            return 'Natural';
        case 'shabby':
            return 'Shabby';
    }
}
export function getMaterialColorDescription(materialColor) {
    switch (materialColor) {
        case 'coal':
            return 'Coal';
        case 'indigo':
            return 'Indigo';
        case 'ivory':
            return 'Ivory';
        case 'mint':
            return 'Mint';
        case 'wine':
            return 'Wine';
    }
}
export function renderArtworkLabel(config, artwork) {
    return `
        <div>
          <span class="artist">${artwork === null || artwork === void 0 ? void 0 : artwork.artistDisplayName}</span>
          <span class="title">${artwork === null || artwork === void 0 ? void 0 : artwork.title}</span>,
          <span class="date">${artwork === null || artwork === void 0 ? void 0 : artwork.objectDate}</span>
          <br><br>
          <span class="frame-description">${buildConfigDescription(config)}</span>
        </div>`;
}
export function buildConfigDescription(config) {
    const size = getPrintSizeDescription(config.printSize);
    let frameDescription = `${size} print in a ${mmToCm(config.frameWidth)} cm ${config.frameStyle} frame`;
    if (config.matWidth !== 0) 
    return frameDescription + '.';
}
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