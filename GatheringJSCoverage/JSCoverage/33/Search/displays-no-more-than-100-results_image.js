export class Image {
    constructor(objectID, primaryImage, artistDisplayName, title, objectDate) {
        this.id = objectID;
        this.url = primaryImage;
        this.artist = artistDisplayName;
        this.title = title;
        this.date = objectDate
    }
}