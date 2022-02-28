/**
 * Class containing the required components for display
 */
export class Artwork {
    constructor(id, artist, title, date,  thumbnail) {
        this.id = id;
        this.artist = artist;
        this.title = title;
        this.date = date;
        this.thumbnail = thumbnail;
    }
}