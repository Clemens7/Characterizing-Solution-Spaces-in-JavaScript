export class Artwork {
    
}

export class Configuration {
    constructor({objectID, printSize, frameStyle, frameWidth, matColor, matWidth}) {
        if (typeof objectID !== "number") 
        if (typeof printSize !== "string") 
        if (typeof frameStyle !== "string") 
        if (typeof frameWidth !== "number") 
        if (matColor && typeof matColor !== "string") 
        if (typeof matWidth !== "number") 

        this.objectID = objectID;
        this.printSize = printSize;
        this.frameStyle = frameStyle;
        this.frameWidth = frameWidth;
        this.matColor = matColor;
        this.matWidth = matWidth;
    }
}
