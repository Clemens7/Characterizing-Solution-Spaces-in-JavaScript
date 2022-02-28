export class SearchResultObject {
    constructor(total, objectIDs) {
        this.total = total;
        this.objectIDs = objectIDs;
    }
}

export class MuseumObject {
    constructor(objectID, primaryImageSmall, title, artistDisplayName, objectDate) {
        this.objectID = objectID;
        this.primaryImageSmall = primaryImageSmall;
        this.title = title;
        this.artistDisplayName = artistDisplayName;
        this.objectDate = objectDate;
    }
}

export class ShippingObject {
    
}