export class SearchObject {
    constructor(objectId, primaryImage, title, artistDisplayName, objectDate) {
        this.objectId = objectId;
        this.primaryImage = primaryImage;
        this.title = title;
        this.artistDisplayName = artistDisplayName;
        this.objectDate = objectDate;
    }

    getConfigureHref() {
        return `/config.html?objectID=${this.objectId}`
    }
}

export function parseSearchObject(rawData) {
    return new SearchObject(rawData.objectID, rawData.primaryImageSmall, rawData.title, rawData.artistDisplayName, rawData.objectDate);
}
