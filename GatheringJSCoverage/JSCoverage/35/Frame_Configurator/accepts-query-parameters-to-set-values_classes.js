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
    
}
