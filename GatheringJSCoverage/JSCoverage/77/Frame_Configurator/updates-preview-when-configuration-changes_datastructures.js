export class Picture {
    constructor(id, title, artist, image, image_small, date, link) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.image = image;
        this.image_small = image_small;
        this.date = date;
        this.link = link;
    }
}

export class Artwork {
    constructor(objectID, printSize, frameStyle, frameWidth, matColor, matWidth) {
        this.objectID = objectID;
        this.printSize = printSize;
        this.frameStyle = frameStyle;
        this.frameWidth = frameWidth;
        this.matColor = matColor;
        this.matWidth = matWidth;
    }
}
