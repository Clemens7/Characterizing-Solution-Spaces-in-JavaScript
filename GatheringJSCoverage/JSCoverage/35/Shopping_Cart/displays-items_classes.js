export class Artwork {
    constructor({objectID, primaryImageSmall, artistDisplayName, title, objectDate}) {
        if (typeof objectID !== "number") 
        if (typeof primaryImageSmall !== "string") 
        if (typeof artistDisplayName !== "string") 
        if (typeof title !== "string") 
        if (typeof objectDate !== "string") 

        this.objectID = objectID;
        this.primaryImageSmall = primaryImageSmall;
        this.artistDisplayName = artistDisplayName;
        this.title = title;
        this.objectDate = objectDate;
    }
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
