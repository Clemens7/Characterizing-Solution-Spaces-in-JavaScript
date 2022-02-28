export class CartItem {
    constructor(objectID, printSize, frameWidth, frameStyle, matWidth, matColor) {
        this.objectID = objectID;
        this.printSize = printSize;
        this.frameWidth = frameWidth;
        this.frameStyle = frameStyle;
        this.matWidth = matWidth;
        this.matColor = matColor;
    }

    toQueryParams() {
        let str = `objectID=${this.objectID}&printSize=${this.printSize}&frameWidth=${this.frameWidth}&frameStyle=${this.frameStyle}&matColor=${this.matColor}&matWidth=${this.matWidth}`;
        return str;
    }

    generateDesc() {
        let size =  {
            "S": "Small",
            "M": "Medium",
            "L": "Large"
        }

        let text = `${size[this.printSize]} print in a ${this.frameWidth/10} cm ${this.frameStyle} frame`;
        if (this.matWidth !== 0) {
            text = text + ` with a ${this.matWidth/10} cm ${this.matColor} mat`;
        }
        return text + ".";
    }
}
