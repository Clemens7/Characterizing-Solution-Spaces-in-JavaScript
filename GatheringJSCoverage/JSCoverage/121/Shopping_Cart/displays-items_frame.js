import { calcPrintSizes } from './shared/calc-print-sizes.js';
import { mmToCm } from './shared/model-utils.js';
export function render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth) {
    const printSizes = calcPrintSizes(img);
    const w = printSizes[printSize][0];
    const h = printSizes[printSize][1];
    let x;
    if (w > h) 
    else {
        x = container.offsetHeight / (h + 2 * matWidth + 2 * frameWidth);
    }
    const frameImageSlices = {
        classic: 115,
        natural: 75,
        shabby: 120,
        elegant: 107,
    };
    const matColors = {
        ivory: '#fffff0',
        mint: '#e0e6d4',
        wine: '#50222d',
        indigo: '#29434c',
        coal: '#333a3d',
    };
    img.style.boxSizing = 'border-box';
    img.width = (w + 2 * matWidth + 2 * frameWidth) * x;
    img.height = (h + 2 * matWidth + 2 * frameWidth) * x;
    img.style.borderImageSource = `url(frame-styles/${frameStyle}.jpg)`;
    img.style.borderImageSlice = frameImageSlices[frameStyle] + '';
    img.style.borderWidth = `${frameWidth * x}px`;
    img.style.backgroundColor = matColors[matColor];
    img.style.padding = `${matWidth * x}px`;
}
export function calculatePrice(printSize, frameStyle, frameWidth, matWidth) {
    let price = 30;
    let frameStyleMultiplier = 1.0;
    switch (frameStyle) {
        
        case 'natural':
            frameStyleMultiplier = 0.8;
            break;
        case 'shabby':
            frameStyleMultiplier = 0.9;
            break;
        case 'elegant':
            frameStyleMultiplier = 0.85;
            break;
    }
    price += mmToCm(frameWidth) * frameStyleMultiplier + mmToCm(matWidth) * 0.05;
    if (printSize === 'M') {
        price *= 2.0;
    }
    else if (printSize === 'L') 
    return (Math.round((price + Number.EPSILON) * 100) / 100);
}
//# sourceMappingURL=frame.js.map