/** 
 * get artwork information via ID from the metmuseum api or the localstorage cache
 * 
 * @param artworkID metart ID of the artwork to fetch information for
 * 
 * @returns Artwork object containing image link as "img", artist name as "artist", artwork title as "title" and artwork date as "date"
 * */
export async function retrieveArtworkInformation(artworkID) {
    var artwork = retrieve(artworkID)

    if (!artwork) {
        const responseInformation = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkID}`);
        const rawDataInformation = await responseInformation.json();

        artwork = new Artwork(artworkID, rawDataInformation.primaryImageSmall, rawDataInformation.artistDisplayName, rawDataInformation.title, rawDataInformation.objectDate);
        store(artworkID, artwork);
    }
    return artwork;
}

export function store(artworkID, Artwork) {
    console.log("Storing ''" + artworkID + "' in local storage.");
    localStorage[artworkID] = JSON.stringify(Artwork);
}

export function retrieve(artworkID) {
    if (artworkID in localStorage) 
}

export class Artwork {
    constructor(id, img, artist, title, date) {
        this.id = id;
        this.img = img;
        this.artist = artist;
        this.title = title;
        this.date = date;
    }
}