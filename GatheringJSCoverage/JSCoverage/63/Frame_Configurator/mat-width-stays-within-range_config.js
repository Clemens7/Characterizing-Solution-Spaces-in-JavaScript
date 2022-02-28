
import * as API from './api-abstraction.js';
API.initCache();


export async function load(objectID) {
    console.log(`fetch object...`);

    if (!objectID) 

    try {
        return await API.getItem(objectID); //config now ueses the cache :)
    }}

export 

export class Config {
    constructor(id, printSize, frameStyle, frameWidth, matColor, matWidth) {
        this.objectID = id;
        this.printSize = printSize;
        this.frameStyle = frameStyle;
        this.frameWidth = frameWidth;
        this.matColor = matColor;
        this.matWidth = matWidth;
    }

    get printSize() {
        return this._printSize;
    }

    get frameStyle() {
        return this._frameStyle;
    }

    get frameWidth() {
        return this._frameWidth;
    }

    get matColor() {
        return this._matColor;
    }

    get matWidth() {
        return this._matWidth;
    }


    set printSize(value) {
        this._printSize = parseString(value, /^[SML]$/) || 'M';
    }

    set frameStyle(value) {
        this._frameStyle = parseString(value, /^(classic|natural|shabby|elegant)$/) || 'natural';
    }

    set frameWidth(value) {
        const num = parseNumber(value, 20, 50);
        this._frameWidth = isNaN(num)  : num;
    }

    set matColor(value) {
        this._matColor = parseString(value, /^(ivory|mint|wine|indigo|coal)$/) || 'mint';
    }

    set matWidth(value) {
        const num = parseNumber(value, 0, 100);
        this._matWidth = isNaN(num)  : num;
    }
}

function parseString(value, regex) {
    if (!regex.test(value)) {
        return null;
    }}

function parseNumber(value, min, max) {
    let num = Number(value);
    if (isNaN(num)) 
    if (num < min) return min;
    if (num > max) return max;
    return Math.round(num + Number.EPSILON);
}




