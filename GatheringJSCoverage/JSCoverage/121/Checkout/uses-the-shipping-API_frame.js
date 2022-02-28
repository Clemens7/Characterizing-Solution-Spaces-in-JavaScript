import { calcPrintSizes } from './shared/calc-print-sizes.js';
import { mmToCm } from './shared/model-utils.js';
export 
export function calculatePrice(printSize, frameStyle, frameWidth, matWidth) {
    let price = 30;
    let frameStyleMultiplier = 1.0;
    switch (frameStyle) {
        
        
        case 'shabby':
            frameStyleMultiplier = 0.9;
            break;
        
    }
    price += mmToCm(frameWidth) * frameStyleMultiplier + mmToCm(matWidth) * 0.05;
    if (printSize === 'M') 
    else if (printSize === 'L') {
        price *= 3.5;
    }
    return (Math.round((price + Number.EPSILON) * 100) / 100);
}
//# sourceMappingURL=frame.js.map