export class Artmart {

    /**
     * Creates a new Artmart artwork model
     * @constructor
     * @param {number} objectID The unique Object ID for an object Format: 0-9 integer
     * @param {string} objectDate Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created
     * @param {string} primaryImageSmall URL to the lower-res primary image of an object in JPEG format
     * @param {string} objectName Describes the physical type of the object
     * @param {string} title Title, identifying phrase, or name given to a work of art
     * @param {string} artistDisplayName Artist name in the correct order for display
     */
    constructor(objectID, objectDate, primaryImageSmall, objectName, title, artistDisplayName) {
        this.objectID = objectID;
        this.objectDate = objectDate;
        this.primaryImageSmall = primaryImageSmall;
        this.objectName = objectName;
        this.title = title;
        this.artistDisplayName = artistDisplayName;
    }
}

export var Searchterm = {
    replaceBlank: function (searchterm) {
        return searchterm.replace(/\s/g, "+");
    }
}