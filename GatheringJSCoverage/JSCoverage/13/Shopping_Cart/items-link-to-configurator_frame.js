export class Serializable {
    fillFromJSON(jsonObj) {
        for (var propName in jsonObj) {
            if (this.hasOwnProperty("_" + propName)) {
                this["_" + propName] = jsonObj[propName];
            }
        }
    }
}
export var PrintSize;
(function (PrintSize) {
    PrintSize["S"] = "S";
    PrintSize["M"] = "M";
    PrintSize["L"] = "L";
})(PrintSize || (PrintSize = {}));
export var FrameStyle;
(function (FrameStyle) {
    FrameStyle["classic"] = "classic";
    FrameStyle["natural"] = "natural";
    FrameStyle["shabby"] = "shabby";
    FrameStyle["elegant"] = "elegant";
})(FrameStyle || (FrameStyle = {}));
export var MatColor;
(function (MatColor) {
    MatColor["ivory"] = "ivory";
    MatColor["mint"] = "mint";
    MatColor["wine"] = "wine";
    MatColor["indigo"] = "ingigo";
    MatColor["coal"] = "coal";
})(MatColor || (MatColor = {}));
[];
[];
export class FrameConfiguration extends Serializable {
    constructor() {
        super(...arguments);
        this._printSize = null;
        this._frameWidth = null;
        this._frameStyle = null;
        this._matWidth = null;
        this._matColor = null;
        this.printSizes = { "S": "Small", "M": "Medium", "L": "Large" };
        /*get toJSON(): string{
          return JSON.stringify(this);
        }*/
    }
    get printSize() {
        return this._printSize;
    }
    get printSizeasString() {
        return this.printSizes[this._printSize];
    }
    get frameWidth() {
        return this._frameWidth;
    }
    get frameStyle() {
        return this._frameStyle;
    }
    get matWidth() {
        return this._matWidth;
    }
    get matColor() {
        return this._matColor;
    }
    get price() {
        return calculatePrice(this._printSize, this._frameStyle, this._frameWidth, this._matWidth);
    }
    loadImage(img, container) {
        render(img, container, this._printSize, this._frameStyle, this._frameWidth, this._matColor, this._matWidth);
    }
}
/**
 * Calculates the possible print sizes for an image.
 *
 * @param img An Image object. Note: if the image is not fully loaded yet, results might be unexpected.
 * @returns A dictionary with fitting sizes for small, medium and large prints.
 *          The keys are 'S', 'M' and 'L' and the entries are two-element arrays [w,h] of width and height.
 */
export function getPrintSizes(img) {
    let S = [297, 297]; // A4
    let M = [420, 420]; // A3
    let L = [594, 594]; // A2
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    if (h > w) 
    else {
        S[1] = Math.floor(h * S[0] / w);
        M[1] = Math.floor(h * M[0] / w);
        L[1] = Math.floor(h * L[0] / w);
    }
    return { S: S, M: M, L: L };
}
/**
 * Renders an image within a given square container as a print of a certain size, with a frame and a mat.
 *
 * @param img An Image object. Note: if the image is not fully loaded yet, results might be unexpected.
 * @param container The object that contains the Image.
 * @param printSize The size of the print, either 'S', 'M' or 'L'.
 * @param frameStyle The type of frame, as a string.
 * @param frameWidth The width of the frame, in millimeters.
 * @param matColor The color of the mat, as a string.
 * @param matWidth The width of the mat, in millimeters.
 */
export function render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth) {
    const printSizes = getPrintSizes(img);
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
        elegant: 107
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
    img.style.borderImageSlice = frameImageSlices[frameStyle].toString();
    img.style.borderWidth = `${frameWidth * x}px`;
    img.style.backgroundColor = matColors[matColor];
    img.style.padding = `${matWidth * x}px`;
}
/**
 * Returns the price of a given frame configuration in euros,
 * as a floating point number rounded to two decimal places.
 *
 * For small prints, each frame has a base cost of 30€, plus
 * the wood cost per centimeter of width: 1€ per centimeter for
 * a classic frame, 80¢ for a natural frame, 90¢ for a shabby
 * frame and 85¢ for an elegant frame. One centimeter of mat
 * costs 5¢. Medium prints are twice the price of small prints
 * and large prints are three-and-a-half times the price.
 *
 * @param printSize The size of the print, either 'S', 'M' or 'L'.
 * @param frameStyle The type of frame, as a string.
 * @param frameWidth The width of the frame, in millimeters.
 * @param matWidth The width of the mat, in millimeters.
 */
export function calculatePrice(printSize, frameStyle, frameWidth, matWidth) {
    //convert sizes from mm to cm;
    frameWidth /= 10;
    matWidth /= 10;
    //Base cost
    let price = 30.0;
    //Frame
    switch (frameStyle) {
        case FrameStyle.classic:
            price += frameWidth;
            break;
        case FrameStyle.natural:
            price += frameWidth * 0.8;
            break;
        case FrameStyle.shabby:
            price += frameWidth * 0.9;
            break;
        case FrameStyle.elegant:
            price += frameWidth * 0.85;
            break;
    }
    //Mat
    price += matWidth * 0.05;
    //Size
    if (printSize === PrintSize.S) {
        return (Math.round(price * 100) / 100);
    }
    else if (printSize === PrintSize.M) {
        return (Math.round((price * 2) * 100) / 100);
    }
    else if (printSize === PrintSize.L) {
        return (Math.round((price * 3.5) * 100) / 100);
    }}
