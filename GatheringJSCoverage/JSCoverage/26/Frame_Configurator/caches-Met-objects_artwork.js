/** 
 * get artwork information via ID from the metmuseum api or the localstorage cache
 * 
 * @param artworkID metart ID of the artwork to fetch information for
 * 
 * @returns Artwork object containing image link as "img", artist name as "artist", artwork title as "title" and artwork date as "date"
 * */
export async function retrieveArtworkInformation(artworkID) {
    var artwork = retrieve(artworkID)

    if (!artwork) 
    return artwork;
}

export 

export function retrieve(artworkID) {
    if (artworkID in localStorage) {
        console.log("Retrieving '" + artworkID + "' from local storage");
        return JSON.parse(localStorage[artworkID]);
    }
}

export class Artwork {
    
}