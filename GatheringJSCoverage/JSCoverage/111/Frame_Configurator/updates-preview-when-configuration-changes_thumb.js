import * as CONSTANTS from "./search/search-constants.js"

export class Thumb {
    constructor(artistDisplayName, title, objectDate, primaryImage, objectID) {
        this.artistDisplayName = artistDisplayName;
        this.title = title;
        this.objectDate = objectDate;
        this.primaryImage = primaryImage;
        this.objectID = objectID;
        this.frameConfigHref = CONSTANTS.FRAME_CONFIG_URL + objectID;
    }

    
}
