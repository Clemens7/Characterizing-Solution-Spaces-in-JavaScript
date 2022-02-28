import { getPrintSizes } from "./frame.js";

export class PrintSize {
    constructor(size, x, y) {
        this._size = size;
        this._x = x;
        this._y = y;
        this._element = document.querySelector(`.segmented input[id=print-size-${this._size.toLowerCase()}]`);
    }

    get size() { return this._size; }

    get x() { return this._x; }

    get y() { return this._y; }

    get element() { return this._element; }

    

    

    

    

    calculate(img) {
        const sizes = getPrintSizes(img)[this._size];
        this._x = sizes[0];
        this._y = sizes[1];
        const x = document.querySelector(`.segmented label[id=print-size-${this._size.toLowerCase()}-label] span[id=size-${this._size.toLowerCase()}-x]`);
        const y = document.querySelector(`.segmented label[id=print-size-${this._size.toLowerCase()}-label] span[id=size-${this._size.toLowerCase()}-y]`);
        x.innerHTML = this._x;
        y.innerHTML = this._y;
    }
}

export const PrintSizes = Object.freeze({
    SMALL: 'S',
    MEDIUM: 'M',
    LARGE: 'L'
});