export class Artwork {
    /**
     * If the json is provided it is pares into the object structure.
     * @param json (optional) the json returned by the API.
     */
    constructor(json) {
        this.objectID = "";
        this.imageSrc = "";
        this.artist = "";
        this.title = "";
        this.date = "";
        if (json) {
            this.objectID = json.objectID;
            this.imageSrc = json.primaryImageSmall;
            this.artist = json.artistDisplayName;
            this.title = json.title;
            this.date = json.objectDate;
        }
    }
}
