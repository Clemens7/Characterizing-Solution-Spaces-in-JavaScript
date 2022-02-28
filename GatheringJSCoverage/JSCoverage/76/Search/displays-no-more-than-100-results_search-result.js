export class Artwork {
constructor(objectID, title, artistDisplayName, objectDate, primaryImage, primaryImageSmall, medium){

    this.objectID = objectID;
    this.title = title;
    this.artist = artistDisplayName;
    this.date = objectDate;
    this.image = primaryImage;
    this.imageSmall = primaryImageSmall;
    this.medium = medium;
}
}