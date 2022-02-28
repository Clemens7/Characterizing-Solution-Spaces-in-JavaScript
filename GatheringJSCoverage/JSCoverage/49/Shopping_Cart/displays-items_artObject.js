export class ArtObject {
    constructor(apiObject) {
        this.artObjectID = apiObject.objectID;
        this.title = apiObject.title;
        this.artist = apiObject.artistDisplayName;
        this.year = apiObject.objectDate;
        this.previewImage = apiObject.primaryImageSmall;
    }
}