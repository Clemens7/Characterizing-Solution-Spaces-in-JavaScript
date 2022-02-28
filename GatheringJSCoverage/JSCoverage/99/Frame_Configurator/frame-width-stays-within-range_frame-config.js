const printSizeDefault = 'M';
const printSizeValues = ['S','M','L'];
const frameWidthDefault = 40;
const frameWidthValues = range(20,50);
const frameStyleDefault = 'natural';
const frameStyleValues = ['classic','natural','shabby','elegant'];
const matWidthDefault = 55;
const matWidthValues = range(0,100);
const matColorDefault = 'mint';
const matColorValues = ['ivory','mint','wine','indigo','coal'];

export class FrameConfig {
    
    constructor(printSize=printSizeDefault, 
                frameWidth=frameWidthDefault, 
                frameStyle=frameStyleDefault, 
                matWidth=matWidthDefault, 
                matColor=matColorDefault) {

        if(printSize !== null )  else {
            this.printSize = printSizeDefault;
        }

        if(frameWidth !== null)  else {
            this.frameWidth = frameWidthDefault;
        }

        if(frameStyle !== null )  else {
            this.frameStyle = frameStyleDefault;
        }

        if(matWidth !== null)  else {
            this.matWidth = matWidthDefault;
        }

        if(matColor !== null )  else {
            this.matColor = matColorDefault;
        }
    }

    get printSize() {
        return this._printSize;
    }

    set printSize(printSize) {
        if(printSize === undefined || printSize === null) 
        if(printSizeValues.includes(printSize)) {
            this._printSize = printSize;
        }
    }

    get frameWidth() {
        return this._frameWidth;
    }

    set frameWidth(frameWidth) {
        if(frameWidth === undefined || frameWidth === null) 
        console.log(frameWidth);

        let min = Math.min(...frameWidthValues);
        let max = Math.max(...frameWidthValues);

        if(frameWidthValues.includes(frameWidth)) {
            this._frameWidth = frameWidth;
        } else if(frameWidth < min) {
            this._frameWidth = min;
        } else if(frameWidth > max) {
            this._frameWidth = max;
        } else {
            this._frameWidth = Math.round(frameWidth);
        }    
    }

    get frameStyle() {
        return this._frameStyle;
    }

    set frameStyle(frameStyle) {
        if(frameStyle === undefined || frameStyle === null) 
        if(frameStyleValues.includes(frameStyle)) {
            this._frameStyle = frameStyle;
        }
    }

    get matWidth() {
        return this._matWidth;
    }

    set matWidth(matWidth) {
        if(matWidth === undefined || matWidth === null) 
        let min = Math.min(...matWidthValues);
        let max = Math.max(...matWidthValues);

        if(matWidthValues.includes(matWidth)) {
            this._matWidth = matWidth;
        }
    }

    get matColor() {
        return this._matColor;
    }

    set matColor(matColor) {
        if(matColor === undefined || matColor === null) 
        if(matColorValues.includes(matColor)) {
            this._matColor = matColor;
        }
    }
}

function range(start, end) {
    let range = [];
    for(let i = start; i <= end; i++) {
        range.push(i);
    }
    return range;
}