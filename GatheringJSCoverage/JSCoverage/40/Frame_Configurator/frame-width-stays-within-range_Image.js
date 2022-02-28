import { getPrintSizes, render } from "./frame.js";

export class Image {
    constructor(img, printSize, frameStyle, frameWidth, matColor, matWidth) {
        this._img = img;
        this._printSize = printSize;
        this._frameStyle = frameStyle;
        this._frameWidth = frameWidth;
        this._matColor = matColor;
        this._matWidth = matWidth;
    }

    

    

    get frameStyle() { return this._frameStyle; }

    get frameWidth() { return this._frameWidth; }

    

    get matWidth() { return this._matWidth; }

    

    

    

    set frameWidth(value) { this._frameWidth = value; this.renderImage() }

    

    

    renderImage() {
        render(this._img, this._img.parentElement, this._printSize, this._frameStyle, this._frameWidth, this._matColor, this._matWidth)
    }
}